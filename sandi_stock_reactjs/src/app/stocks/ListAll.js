import React, { useState, useEffect, useMemo } from 'react'
import { Form } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import Modal from '../components/Modal';
import Alert from '../components/Alert';
import Validator from '../../utils/validator';
import Common from '../../utils/common';
import { fetchWrapper } from '../../utils/fetch-wrapper';
import './ListAll.scss';

// Danh sách tất cả kho (dạng phẳng): tìm kiếm, lọc theo nhóm / trạng thái, sắp xếp, phân trang.
// Màn hình quản lý theo cây nhóm kho vẫn ở stocks/List.js (/stocks/list).

const ROOT_ID = 1;
const PAGE_SIZES = [10, 20, 50];
const STATUS = {
  1: { label: 'Hoạt động', badge: 'badge-success' },
  0: { label: 'Tạm dừng', badge: 'badge-warning' },
};

// Loại modal kho
const MODE = { INSERT: 1, EDIT: 2, VIEW: 3, DELETE: 4 };
const MODE_TITLE = {
  [MODE.INSERT]: 'Thêm kho',
  [MODE.EDIT]: 'Sửa thông tin kho',
  [MODE.VIEW]: 'Xem thông tin kho',
  [MODE.DELETE]: 'Xóa kho',
};

const emptyStock = { id: 0, code: '', name: '', description: '', status: 1, group_id: '' };

const stock_validator = new Validator([
  { field: 'code', method: 'isEmpty', validWhen: false, message: 'Vui lòng nhập mã kho.' },
  { field: 'name', method: 'isEmpty', validWhen: false, message: 'Vui lòng nhập tên kho.' },
  { field: 'group_id', method: 'isEmpty', validWhen: false, message: 'Vui lòng chọn nhóm kho.' },
]);

// Bỏ dấu tiếng Việt để tìm kiếm không phân biệt dấu
const removeAccents = (s) =>
  (s || '').toString().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase();

function ListAll() {
  const history = useHistory();

  const [stocks, setStocks] = useState([]);
  const [stockGroups, setStockGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  // bộ lọc
  const [keyword, setKeyword] = useState('');
  const [groupFilter, setGroupFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sort, setSort] = useState({ field: 'code', asc: true });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);

  // modal kho
  const [mode, setMode] = useState(0);
  const [showStockModal, setShowStockModal] = useState(false);
  const [stock, setStock] = useState(emptyStock);
  const [stock_errors, setStockErrors] = useState({});
  const [saving, setSaving] = useState(false);

  // thông báo
  const [alert_message, setAlertMessage] = useState('');
  const [alert_show, setAlertShow] = useState(false);
  const showAlert = (message) => { setAlertMessage(message); setAlertShow(true); };

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // API stock_groups trả về cả nhóm kho và danh sách kho trong một lần gọi
  function fetchData() {
    setLoading(true)
    fetchWrapper.get(process.env.REACT_APP_API_URL + 'stock_groups')
      .then((data) => {
        if (data.success && data.data) {
          setStockGroups(data.data.stockGroups || [])
          setStocks(data.data.stocks || [])
        } else {
          showAlert('Không tải được danh sách kho')
        }
      })
      .catch(() => showAlert('Không tải được danh sách kho'))
      .finally(() => setLoading(false))
  }

  // ===== Nhóm kho: tra cứu nhanh =====
  const groupById = useMemo(() => {
    const m = {};
    stockGroups.forEach((g) => { m[g.id] = g; });
    return m;
  }, [stockGroups]);

  // Đường dẫn nhóm (bỏ nhóm gốc): "Miền Bắc › Hà Nội"
  const groupPath = (groupId) => {
    const names = [];
    let g = groupById[groupId];
    while (g && g.id !== ROOT_ID) {
      names.unshift(g.name);
      g = groupById[g.parent_id];
    }
    return names.join(' › ');
  };

  // Danh sách nhóm cho ô lọc, sắp theo thứ tự cây và thụt lề theo cấp
  const groupOptions = useMemo(() => {
    const children = {};
    stockGroups.forEach((g) => { (children[g.parent_id] = children[g.parent_id] || []).push(g); });
    const result = [];
    const walk = (parentId, level) => {
      (children[parentId] || [])
        .sort((a, b) => a.name.localeCompare(b.name, 'vi'))
        .forEach((g) => {
          result.push({ ...g, level, isLeaf: !children[g.id] });
          walk(g.id, level + 1);
        });
    };
    walk(ROOT_ID, 0);
    return result;
  }, [stockGroups]);

  // Lọc theo nhóm cha thì lấy luôn kho của các nhóm con
  const groupIdsInFilter = useMemo(() => {
    if (!groupFilter) return null;
    const ids = new Set();
    const stack = [Number(groupFilter)];
    while (stack.length) {
      const id = stack.pop();
      if (ids.has(id)) continue;
      ids.add(id);
      stockGroups.filter((g) => g.parent_id === id).forEach((g) => stack.push(g.id));
    }
    return ids;
  }, [groupFilter, stockGroups]);

  // ===== Lọc + sắp xếp + phân trang =====
  const filtered = useMemo(() => {
    const kw = removeAccents(keyword.trim());
    const list = stocks.filter((s) => {
      if (kw && !removeAccents(`${s.code} ${s.name} ${s.description}`).includes(kw)) return false;
      if (groupIdsInFilter && !groupIdsInFilter.has(s.group_id)) return false;
      if (statusFilter !== '' && Number(s.status) !== Number(statusFilter)) return false;
      return true;
    });
    const value = (s) => (sort.field === 'group' ? groupPath(s.group_id) : s[sort.field]);
    list.sort((a, b) => {
      const x = value(a), y = value(b);
      const c = typeof x === 'number' && typeof y === 'number'
        ? x - y
        : String(x || '').localeCompare(String(y || ''), 'vi', { numeric: true });
      return sort.asc ? c : -c;
    });
    return list;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stocks, keyword, groupIdsInFilter, statusFilter, sort, groupById]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const counts = useMemo(() => ({
    total: stocks.length,
    active: stocks.filter((s) => Number(s.status) === 1).length,
    paused: stocks.filter((s) => Number(s.status) === 0).length,
  }), [stocks]);

  const hasFilter = keyword || groupFilter || statusFilter !== '';
  const resetFilter = () => { setKeyword(''); setGroupFilter(''); setStatusFilter(''); setPage(1); };
  const changeFilter = (setter) => (event) => { setter(event.target.value); setPage(1); };
  const changeSort = (field) => setSort((s) => ({ field, asc: s.field === field ? !s.asc : true }));

  // ===== Modal kho =====
  const handleStockChange = (event) => {
    event.persist();
    setStock((s) => ({ ...s, [event.target.name]: event.target.value }));
  };
  const handleStatusChange = (event) => {
    event.persist();
    setStock((s) => ({ ...s, status: event.target.checked ? 1 : 0 }));
  };

  // Gợi ý mã kho mới theo mã các nhóm: "MB-HN-003" (giống màn hình cây nhóm kho)
  const suggestCode = (groupId) => {
    const codes = [];
    let g = groupById[groupId];
    while (g && g.id !== ROOT_ID) {
      codes.unshift(g.code);
      g = groupById[g.parent_id];
    }
    if (!codes.length) return '';
    const count = stocks.filter((s) => s.group_id === Number(groupId)).length;
    return codes.join('-') + '-' + Common.ConvertToString(count + 1, 3);
  };

  const handleGroupInModal = (event) => {
    const group_id = event.target.value;
    setStock((s) => ({
      ...s,
      group_id,
      // chỉ tự điền mã khi người dùng chưa tự nhập
      code: mode === MODE.INSERT && (!s.code || s.code === suggestCode(s.group_id)) ? suggestCode(group_id) : s.code,
    }));
  };

  function openStockModal(type, item) {
    setStockErrors({})
    setMode(type)
    if (type === MODE.INSERT) {
      // nếu đang lọc theo một nhóm lá thì chọn sẵn nhóm đó
      const g = groupOptions.find((o) => String(o.id) === String(groupFilter));
      const group_id = g && g.isLeaf ? String(g.id) : '';
      setStock({ ...emptyStock, group_id, code: group_id ? suggestCode(group_id) : '' })
    } else {
      setStock({
        id: item.id,
        code: item.code || '',
        name: item.name || '',
        description: item.description || '',
        status: Number(item.status),
        group_id: String(item.group_id),
      })
    }
    setShowStockModal(true)
  }

  function handleSaveStock() {
    if (mode === MODE.DELETE) {
      callApi(fetchWrapper.delete(process.env.REACT_APP_API_URL + 'stocks/' + stock.id + '/delete'))
      return
    }
    const current_errors = stock_validator.validate(stock)
    const code = stock.code.trim()
    if (!current_errors.code && stocks.some((s) => s.id !== stock.id && (s.code || '').toLowerCase() === code.toLowerCase())) {
      current_errors.code = 'Mã kho đã tồn tại.'
    }
    setStockErrors({ ...current_errors })
    if (!Common.isEmptyObject(current_errors)) {
      return
    }
    const body = {
      code,
      name: stock.name.trim(),
      description: stock.description,
      status: stock.status,
      group_id: parseInt(stock.group_id),
    }
    if (mode === MODE.INSERT) {
      callApi(fetchWrapper.post(process.env.REACT_APP_API_URL + 'stocks/insert', body))
    } else if (mode === MODE.EDIT) {
      callApi(fetchWrapper.put(process.env.REACT_APP_API_URL + 'stocks/' + stock.id + '/update', body))
    }
  }

  function callApi(request) {
    setSaving(true)
    request
      .then((data) => {
        setShowStockModal(false)
        if (data.success) {
          fetchData()
        } else {
          showAlert('Có lỗi xảy ra trong quá trình thực hiện')
        }
      })
      .catch(() => {
        setShowStockModal(false)
        showAlert('Có lỗi xảy ra trong quá trình thực hiện')
      })
      .finally(() => setSaving(false))
  }

  // ===== Render =====
  const SortHeader = ({ field, children, style }) => (
    <th className="sortable" style={style} onClick={() => changeSort(field)}>
      {children}
      <i className={'mdi ' + (sort.field !== field ? 'mdi-swap-vertical text-muted' : sort.asc ? 'mdi-arrow-up' : 'mdi-arrow-down')}></i>
    </th>
  );

  const readOnly = mode === MODE.VIEW || mode === MODE.DELETE;
  const leafGroups = groupOptions.filter((g) => g.isLeaf);

  return (
    <div className="stocks-all">
      <div className="page-header">
        <h3 className="page-title"> Danh sách kho </h3>
        <button type="button" className="btn btn-primary btn-icon-text" onClick={() => openStockModal(MODE.INSERT)}>
          <i className="mdi mdi-plus btn-icon-prepend"></i> Thêm kho
        </button>
      </div>

      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              {/* Bộ lọc */}
              <div className="row stocks-all-filter">
                <div className="col-md-4">
                  <Form.Group>
                    <label>Tìm kiếm</label>
                    <Form.Control type="text" placeholder="Mã kho, tên kho, mô tả..." value={keyword} onChange={changeFilter(setKeyword)} />
                  </Form.Group>
                </div>
                <div className="col-md-3">
                  <Form.Group>
                    <label>Nhóm kho</label>
                    <select className="form-control" value={groupFilter} onChange={changeFilter(setGroupFilter)}>
                      <option value="">Tất cả nhóm</option>
                      {groupOptions.map((g) => (
                        <option key={g.id} value={g.id}>{'   '.repeat(g.level)}{g.name}</option>
                      ))}
                    </select>
                  </Form.Group>
                </div>
                <div className="col-md-3">
                  <Form.Group>
                    <label>Trạng thái</label>
                    <select className="form-control" value={statusFilter} onChange={changeFilter(setStatusFilter)}>
                      <option value="">Tất cả trạng thái</option>
                      <option value="1">Hoạt động ({counts.active})</option>
                      <option value="0">Tạm dừng ({counts.paused})</option>
                    </select>
                  </Form.Group>
                </div>
                <div className="col-md-2 stocks-all-reset">
                  <button type="button" className="btn btn-light" disabled={!hasFilter} onClick={resetFilter}>
                    <i className="mdi mdi-filter-remove"></i> Xóa lọc
                  </button>
                </div>
              </div>

              <div className="stocks-all-summary">
                {hasFilter
                  ? <>Tìm thấy <b>{filtered.length}</b> / {counts.total} kho</>
                  : <>Tổng số <b>{counts.total}</b> kho · <span className="text-success">{counts.active} hoạt động</span> · <span className="text-warning">{counts.paused} tạm dừng</span></>}
              </div>

              {/* Bảng */}
              <div className="table-responsive">
                <table className="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th style={{ width: '60px' }} className="center">STT</th>
                      <SortHeader field="code" style={{ width: '150px' }}>Mã kho</SortHeader>
                      <SortHeader field="name">Tên kho</SortHeader>
                      <SortHeader field="group">Nhóm kho</SortHeader>
                      <th>Mô tả</th>
                      <SortHeader field="status" style={{ width: '120px' }}>Trạng thái</SortHeader>
                      <th style={{ width: '190px' }} className="center">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading && (
                      <tr><td colSpan="7" className="center text-muted">Đang tải dữ liệu...</td></tr>
                    )}
                    {!loading && pageItems.length === 0 && (
                      <tr><td colSpan="7" className="center text-muted">
                        {hasFilter ? 'Không có kho nào phù hợp với bộ lọc' : 'Không có bản ghi nào'}
                      </td></tr>
                    )}
                    {!loading && pageItems.map((item, index) => (
                      <tr key={item.id}>
                        <td className="center">{(currentPage - 1) * pageSize + index + 1}</td>
                        <td><a href="#!" className="stocks-all-code" onClick={(e) => { e.preventDefault(); openStockModal(MODE.VIEW, item) }}>{item.code}</a></td>
                        <td className="stocks-all-wrap">{item.name}</td>
                        <td className="stocks-all-wrap text-muted">{groupPath(item.group_id) || '—'}</td>
                        <td className="stocks-all-wrap">{item.description}</td>
                        <td>
                          {STATUS[item.status] && <label className={'badge ' + STATUS[item.status].badge}>{STATUS[item.status].label}</label>}
                        </td>
                        <td className="center stocks-all-actions">
                          <button type="button" className="btn btn-warning btn-icon" title="Xem kho" onClick={() => openStockModal(MODE.VIEW, item)}><i className="mdi mdi-eye"></i></button>
                          <button type="button" className="btn btn-success btn-icon" title="Sửa kho" onClick={() => openStockModal(MODE.EDIT, item)}><i className="mdi mdi-pencil"></i></button>
                          <button type="button" className="btn btn-info btn-icon" title="Xem layout" onClick={() => history.push('/stocks/layout/' + item.id)}><i className="mdi mdi-server"></i></button>
                          <button type="button" className="btn btn-danger btn-icon" title="Xóa kho" onClick={() => openStockModal(MODE.DELETE, item)}><i className="mdi mdi-delete"></i></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Phân trang */}
              {!loading && filtered.length > 0 && (
                <div className="stocks-all-pagination">
                  <div className="text-muted">
                    Hiển thị {(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, filtered.length)} / {filtered.length}
                    <select className="form-control form-control-sm" value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1) }}>
                      {PAGE_SIZES.map((n) => <option key={n} value={n}>{n} / trang</option>)}
                    </select>
                  </div>
                  <ul className="pagination mb-0">
                    <li className={'page-item' + (currentPage === 1 ? ' disabled' : '')}>
                      <button type="button" className="page-link" onClick={() => setPage(currentPage - 1)}>‹</button>
                    </li>
                    {pageNumbers(currentPage, totalPages).map((p, i) => p === '...'
                      ? <li key={'e' + i} className="page-item disabled"><span className="page-link">…</span></li>
                      : <li key={p} className={'page-item' + (p === currentPage ? ' active' : '')}>
                          <button type="button" className="page-link" onClick={() => setPage(p)}>{p}</button>
                        </li>
                    )}
                    <li className={'page-item' + (currentPage === totalPages ? ' disabled' : '')}>
                      <button type="button" className="page-link" onClick={() => setPage(currentPage + 1)}>›</button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* modal kho */}
      <Modal showOverlay={true} size={'md'} show={showStockModal} onClose={() => { setShowStockModal(false) }}>
        <Modal.Header>
          <Modal.Title>{MODE_TITLE[mode]}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {mode === MODE.DELETE && (
            <div className="alert alert-danger">Bạn chắc chắn muốn xóa kho <b>{stock.code}</b>?</div>
          )}
          <Form.Group className="row">
            <label className="col-form-label col-sm-3">Nhóm kho<span className="text-danger">*</span></label>
            <div className="col-sm-9">
              <select className="form-control" name="group_id" disabled={readOnly} value={stock.group_id} onChange={handleGroupInModal}>
                <option value="">-- Chọn nhóm kho --</option>
                {/* Chỉ cho chọn nhóm lá (nhóm không có nhóm con), giống màn hình cây nhóm kho */}
                {leafGroups.map((g) => <option key={g.id} value={g.id}>{groupPath(g.id)}</option>)}
              </select>
              {stock_errors.group_id && <div className="validation">{stock_errors.group_id}</div>}
            </div>
          </Form.Group>
          <Form.Group className="row">
            <label className="col-form-label col-sm-3">Mã kho<span className="text-danger">*</span></label>
            <div className="col-sm-9">
              <Form.Control type="text" readOnly={readOnly} name="code" value={stock.code} onChange={handleStockChange} />
              {stock_errors.code && <div className="validation">{stock_errors.code}</div>}
            </div>
          </Form.Group>
          <Form.Group className="row">
            <label className="col-form-label col-sm-3">Tên kho<span className="text-danger">*</span></label>
            <div className="col-sm-9">
              <Form.Control type="text" readOnly={readOnly} name="name" value={stock.name} onChange={handleStockChange} />
              {stock_errors.name && <div className="validation">{stock_errors.name}</div>}
            </div>
          </Form.Group>
          <Form.Group className="row">
            <label className="col-form-label col-sm-3">Mô tả</label>
            <div className="col-sm-9">
              <textarea className="form-control" readOnly={readOnly} name="description" value={stock.description} onChange={handleStockChange} rows="3"></textarea>
            </div>
          </Form.Group>
          <Form.Group className="row">
            <label className="col-form-label col-sm-3">Trạng thái</label>
            <div className="col-sm-9">
              <div className="form-check">
                <label className="form-check-label text-muted">
                  <input type="checkbox" className="form-check-input" disabled={readOnly} checked={Number(stock.status) === 1} onChange={handleStatusChange} />
                  <i className="input-helper"></i>
                  Hoạt động
                </label>
              </div>
            </div>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          {(mode === MODE.INSERT || mode === MODE.EDIT) &&
            <button type="button" className="btn btn-primary btn-icon small_button" disabled={saving} onClick={handleSaveStock}>Lưu</button>
          }
          {mode === MODE.VIEW &&
            <button type="button" className="btn btn-success btn-icon small_button" onClick={() => setMode(MODE.EDIT)}>Sửa</button>
          }
          {mode === MODE.DELETE &&
            <button type="button" className="btn btn-danger btn-icon small_button" disabled={saving} onClick={handleSaveStock}>Xóa</button>
          }
          <button type="button" className="btn btn-secondary btn-icon small_button" onClick={() => { setShowStockModal(false) }}>Đóng</button>
        </Modal.Footer>
      </Modal>

      <Alert message={alert_message} show={alert_show} onClose={() => setAlertShow(false)} />
    </div>
  )
}

// Phân trang rút gọn: 1 … 4 5 6 … 10
function pageNumbers(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = [1];
  const from = Math.max(2, current - 1);
  const to = Math.min(total - 1, current + 1);
  if (from > 2) pages.push('...');
  for (let i = from; i <= to; i++) pages.push(i);
  if (to < total - 1) pages.push('...');
  pages.push(total);
  return pages;
}

export default ListAll
