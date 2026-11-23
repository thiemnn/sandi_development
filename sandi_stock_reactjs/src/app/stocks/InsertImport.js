import React, { useState, useEffect, useMemo } from 'react'
import { Form } from 'react-bootstrap';
import Select from 'react-select';
import { useHistory } from "react-router-dom";
import { fetchWrapper } from '../../utils/fetch-wrapper';
import Alert from '../components/Alert';
import './InsertImport.scss';

// ===== Danh mục =====
const TYPES = [
  { value: 1, label: "Thành phẩm sản xuất" },
  { value: 2, label: "Mua hàng" },
  { value: 3, label: "Hàng bị trả lại" },
  { value: 4, label: "Hàng nhận gia công" },
  { value: 5, label: "Khác" }
]

// Giống Common.convertStatusImport
const STATUS = [
  { value: 1, label: "Lưu nháp" },
  { value: 2, label: "Xác nhận" },
  { value: 3, label: "Đã nhập" }
]

// Đối tượng giao hàng theo loại nhập
const DELIVER = {
  employee: { code: 'Mã nhân viên', name: 'Tên nhân viên giao hàng', placeholder: 'Tìm nhân viên...' },
  provider: { code: 'Mã đối tác', name: 'Tên đối tác', placeholder: 'Tìm đối tác...' },
  customer: { code: 'Mã khách hàng', name: 'Tên khách hàng', placeholder: 'Tìm khách hàng...' },
}
const deliverKind = (type) => (type === 2 ? 'provider' : type === 3 || type === 4 ? 'customer' : 'employee')

// ===== Tiện ích số =====
const addCommas = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const removeNonNumeric = num => num.toString().replace(/[^0-9.]/g, "");
const toNumber = (s) => parseFloat(removeNonNumeric(s || '')) || 0;
const fmt = (n) => (Math.round(n * 100) / 100).toLocaleString('en', { maximumFractionDigits: 2 });

// Tìm kiếm không phân biệt dấu cho react-select
const removeAccents = (s) =>
  (s || '').toString().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase();
const filterOption = (option, input) =>
  !input || removeAccents(option.data.search || option.label).includes(removeAccents(input));

// Menu của react-select gắn vào body để không bị bảng cuộn ngang cắt mất
const selectPortal = {
  menuPortalTarget: typeof document !== 'undefined' ? document.body : null,
  styles: { menuPortal: (base) => ({ ...base, zIndex: 9999 }) },
}

let lineSeq = 0;

function Insert() {
  const history = useHistory();
  const today = new Date().toISOString().split('T')[0];

  // danh mục từ API
  const [products, setProducts] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [providers, setProviders] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [stockLines, setStockLines] = useState([]);   // dãy + kệ của kho đang chọn

  const [stock_transaction, setStockTransaction] = useState({
    transaction_number: "",
    transaction_type: 5,
    transaction_status: 1,
    stock_id: "",
    deliver_unit_code: "",
    deliver_unit_name: "",
    deliver_person: "",
    transaction_date: today,
    explain: "",
    attach: ""
  });
  const [items, setItems] = useState([]);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  // thông báo
  const [alert_message, setAlertMessage] = useState('');
  const [alert_show, setAlertShow] = useState(false);
  const showAlert = (message) => { setAlertMessage(message); setAlertShow(true); };

  // ===== Tải dữ liệu =====
  useEffect(() => {
    const load = (url, setter) =>
      fetchWrapper.get(process.env.REACT_APP_API_URL + url)
        .then((data) => { if (data.success) setter(data.data || []) })
        .catch((e) => console.error(url, e));
    load('products?type=1', setProducts);
    load('stocks/', setStocks);
    load('customers/', setCustomers);
    load('providers/', setProviders);
    load('employees/', setEmployees);
    // gợi ý số chứng từ tiếp theo (PNKxxxxx)
    fetchWrapper.get(process.env.REACT_APP_API_URL + 'stocks_transactions/lastNumber')
      .then((data) => {
        if (data.success && typeof data.data === 'string') {
          setStockTransaction((t) => (t.transaction_number ? t : { ...t, transaction_number: data.data }))
        }
      })
      .catch(() => { })
  }, [])

  // Kệ thuộc kho đang chọn
  useEffect(() => {
    setStockLines([])
    if (!stock_transaction.stock_id) return
    fetchWrapper.get(process.env.REACT_APP_API_URL + 'stock_lines?stock_id=' + stock_transaction.stock_id)
      .then((data) => { if (data.success) setStockLines(data.data || []) })
      .catch((e) => console.error('stock_lines', e))
  }, [stock_transaction.stock_id])

  // ===== Options cho các ô chọn =====
  const stockOptions = useMemo(() => stocks
    .filter((s) => Number(s.status) === 1)
    .map((s) => ({ value: s.id, label: `${s.code} - ${s.name}`, search: `${s.code} ${s.name}` })), [stocks]);

  const kind = deliverKind(stock_transaction.transaction_type);
  const deliverOptions = useMemo(() => {
    const list = kind === 'provider' ? providers : kind === 'customer' ? customers : employees;
    return list.map((x) => ({ value: x.code, label: `${x.code} - ${x.name}`, name: x.name, search: `${x.code} ${x.name}` }));
  }, [kind, providers, customers, employees]);

  const productOptions = useMemo(() => products.map((p) => ({
    value: p.code, label: `${p.code} - ${p.name}`, search: `${p.code} ${p.name}`, product: p,
  })), [products]);

  // Kệ nhóm theo dãy: "Dãy A" > "A-01"
  const positionOptions = useMemo(() => stockLines.map((line) => ({
    label: line.name || line.code,
    options: (line.shelfs || []).map((shelf) => ({
      value: shelf.code,
      label: shelf.code,
      search: `${shelf.code} ${shelf.name} ${line.code} ${line.name}`,
      name: shelf.name,
    })),
  })).filter((g) => g.options.length), [stockLines]);

  // ===== Xử lý form =====
  const handleChange = (event) => {
    event.persist();
    setStockTransaction((t) => ({ ...t, [event.target.name]: event.target.value }));
  };

  function setTransactionType(option) {
    // đổi loại nhập thì đối tượng giao hàng cũ không còn phù hợp
    setStockTransaction((t) => ({ ...t, transaction_type: option.value, deliver_unit_code: "", deliver_unit_name: "", deliver_person: "" }));
  }

  function setStock(option) {
    const stock_id = option ? option.value : "";
    setStockTransaction((t) => ({ ...t, stock_id }));
    // kệ phụ thuộc kho: đổi kho thì bỏ vị trí đã chọn
    setItems((list) => list.map((item) => ({ ...item, position: '' })));
  }

  function setDeliver(option) {
    setStockTransaction((t) => ({ ...t, deliver_unit_code: option ? option.value : "", deliver_unit_name: option ? option.name : "" }));
  }

  function addProduct(option) {
    if (!option) return;
    const p = option.product;
    setItems((list) => [...list, {
      index: ++lineSeq,
      code: p.code,
      name: p.name,
      unit: p.unit,
      unit_to_kg: p.unit_to_kg,
      tk_co: p.tk_co,
      tk_no: p.tk_no,
      quantity: '',
      price: '',
      position: ''
    }]);
  }

  function handleItemsChange(index, event) {
    const { name, value } = event.target;
    if ((name === "quantity" || name === "price") && !(value === '' || /^[0-9,]*\.?[0-9]?[0-9]?$/.test(value))) return;
    const v = name === "quantity" || name === "price" ? addCommas(removeNonNumeric(value)) : value;
    setItems((list) => list.map((item, i) => (i === index ? { ...item, [name]: v } : item)));
  }

  function setPosition(index, option) {
    setItems((list) => list.map((item, i) => (i === index ? { ...item, position: option ? option.value : '' } : item)));
  }

  function handleRemove(item) {
    setItems((list) => list.filter((element) => element.index !== item.index));
  }

  // ===== Tổng cộng =====
  const totals = useMemo(() => items.reduce((t, item) => {
    const q = toNumber(item.quantity);
    t.quantity += q;
    t.kg += q * (Number(item.unit_to_kg) || 0);
    t.amount += q * toNumber(item.price);
    return t;
  }, { quantity: 0, kg: 0, amount: 0 }), [items]);

  // ===== Kiểm tra dữ liệu =====
  function validate() {
    const e = {};
    const t = stock_transaction;
    if (!t.transaction_number.trim()) e.transaction_number = 'Vui lòng nhập số chứng từ.';
    if (!t.transaction_date) e.transaction_date = 'Vui lòng chọn ngày chứng từ.';
    if (!t.stock_id) e.stock_id = 'Vui lòng chọn kho nhập.';
    if (!t.deliver_unit_code) e.deliver_unit_code = 'Vui lòng chọn ' + DELIVER[kind].code.replace('Mã ', '') + '.';
    if (items.length === 0) e.items = 'Vui lòng thêm ít nhất một vật tư.';

    // Phiếu nháp chưa bắt buộc vị trí; xác nhận / đã nhập thì phải chọn kệ
    const needPosition = Number(t.transaction_status) !== 1;
    const seen = {};
    items.forEach((item) => {
      if (!(toNumber(item.quantity) > 0)) e['quantity_' + item.index] = true;
      if (needPosition && !item.position) e['position_' + item.index] = true;
      const key = item.code + '@' + item.position;
      if (seen[key]) e['dup_' + item.index] = true;
      seen[key] = true;
    });
    if (!e.items) {
      if (items.some((i) => e['quantity_' + i.index])) e.items = 'Số lượng phải lớn hơn 0.';
      else if (items.some((i) => e['position_' + i.index])) e.items = 'Vui lòng chọn vị trí cho tất cả vật tư (bắt buộc khi trạng thái khác Lưu nháp).';
      else if (items.some((i) => e['dup_' + i.index])) e.items = 'Có vật tư bị trùng cùng vị trí. Hãy gộp số lượng vào một dòng.';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  // Sau lần lưu lỗi đầu tiên: kiểm tra lại ngay khi sửa để lỗi tự mất
  const hasErrors = Object.keys(errors).length > 0;
  useEffect(() => {
    if (hasErrors) validate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, stock_transaction])

  function handleSaveStockTransaction() {
    if (!validate()) {
      showAlert('Vui lòng kiểm tra lại thông tin phiếu nhập kho')
      return
    }
    const t = stock_transaction;
    const body = {
      transaction_R_id: null,            // phiếu nhập trực tiếp, không từ phiếu đề nghị
      transaction_number: t.transaction_number.trim(),
      stock_id: t.stock_id,
      transaction_type: t.transaction_type,
      transaction_status: t.transaction_status,
      deliver_unit_code: t.deliver_unit_code,
      deliver_unit_name: t.deliver_unit_name,
      deliver_person: t.deliver_person,
      transaction_date: t.transaction_date,
      transaction_attach: t.attach,
      transaction_explain: t.explain,
      materials: items.map((item) => ({
        ...item,
        quantity_expect: item.quantity,  // nhập trực tiếp: SL yêu cầu = SL thực nhập
        price: item.price || '0',
      }))
    }
    setSaving(true)
    fetchWrapper.post(process.env.REACT_APP_API_URL + 'stocks_transactions/insert', body)
      .then((data) => {
        if (data.success) {
          history.push("/stocks/listImport");
        } else {
          showAlert('Có lỗi xảy ra trong quá trình thực hiện')
        }
      })
      .catch(() => showAlert('Có lỗi xảy ra trong quá trình thực hiện'))
      .finally(() => setSaving(false))
  }

  const handleReturn = () => history.push('/stocks/listImport');

  const err = (name) => errors[name] && <div className="validation">{errors[name]}</div>;
  const selectedStock = stockOptions.find((o) => o.value === stock_transaction.stock_id) || null;
  const selectedDeliver = deliverOptions.find((o) => o.value === stock_transaction.deliver_unit_code) || null;
  const usedCodes = new Set(items.map((i) => i.code));

  return (
    <div className="insert-import">
      <div className="page-header">
        <h3 className="page-title"> Thêm mới phiếu nhập kho</h3>
        <div>
          <button type="button" className="btn btn-light btn-icon-text mr-2" onClick={handleReturn}>
            <i className="mdi mdi-keyboard-return btn-icon-prepend"></i> Quay lại
          </button>
          <button type="button" className="btn btn-primary btn-icon-text" disabled={saving} onClick={handleSaveStockTransaction}>
            <i className="mdi mdi-content-save btn-icon-prepend"></i> {saving ? 'Đang lưu...' : 'Lưu phiếu'}
          </button>
        </div>
      </div>

      {/* Thông tin chung */}
      <div className="row">
        <div className="col-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Thông tin phiếu</h4>
              <form className="forms-sample" onSubmit={(e) => e.preventDefault()}>
                <Form.Group className="row">
                  <label className="col-sm-2 col-form-label">Số chứng từ<span className="text-danger">*</span></label>
                  <div className="col-sm-4">
                    <Form.Control type="text" autoComplete="off" name="transaction_number" value={stock_transaction.transaction_number} onChange={handleChange} placeholder="PNK00001" />
                    {err('transaction_number')}
                  </div>
                  <label className="col-sm-2 col-form-label">Ngày chứng từ<span className="text-danger">*</span></label>
                  <div className="col-sm-4">
                    <Form.Control type="date" name="transaction_date" value={stock_transaction.transaction_date} onChange={handleChange} />
                    {err('transaction_date')}
                  </div>
                </Form.Group>
                <Form.Group className="row">
                  <label className="col-sm-2 col-form-label">Loại nhập kho</label>
                  <div className="col-sm-4">
                    <Select classNamePrefix="select" options={TYPES} isSearchable={false}
                      value={TYPES.find((o) => o.value === stock_transaction.transaction_type)}
                      onChange={setTransactionType} />
                  </div>
                  <label className="col-sm-2 col-form-label">Nhập hàng tại kho<span className="text-danger">*</span></label>
                  <div className="col-sm-4">
                    <Select classNamePrefix="select" options={stockOptions} value={selectedStock} isClearable
                      placeholder="Tìm mã / tên kho..." noOptionsMessage={() => 'Không có kho phù hợp'}
                      filterOption={filterOption} onChange={setStock} />
                    {err('stock_id')}
                  </div>
                </Form.Group>
                <Form.Group className="row">
                  <label className="col-sm-2 col-form-label">{DELIVER[kind].code}<span className="text-danger">*</span></label>
                  <div className="col-sm-4">
                    <Select classNamePrefix="select" options={deliverOptions} value={selectedDeliver} isClearable
                      placeholder={DELIVER[kind].placeholder} noOptionsMessage={() => 'Không có dữ liệu phù hợp'}
                      filterOption={filterOption} onChange={setDeliver} />
                    {err('deliver_unit_code')}
                  </div>
                  <label className="col-sm-2 col-form-label">{DELIVER[kind].name}</label>
                  <div className="col-sm-4">
                    <Form.Control type="text" readOnly value={stock_transaction.deliver_unit_name} />
                  </div>
                </Form.Group>
                <Form.Group className="row">
                  {kind !== 'employee' && (
                    <>
                      <label className="col-sm-2 col-form-label">Người giao hàng</label>
                      <div className="col-sm-4">
                        <Form.Control type="text" autoComplete="off" name="deliver_person" value={stock_transaction.deliver_person} onChange={handleChange} />
                      </div>
                    </>
                  )}
                  <label className="col-sm-2 col-form-label">Diễn giải</label>
                  <div className="col-sm-4">
                    <Form.Control type="text" autoComplete="off" name="explain" value={stock_transaction.explain} onChange={handleChange} />
                  </div>
                </Form.Group>
                <Form.Group className="row mb-0">
                  <label className="col-sm-2 col-form-label">Kèm theo</label>
                  <div className="col-sm-4">
                    <Form.Control type="text" autoComplete="off" name="attach" value={stock_transaction.attach} onChange={handleChange} placeholder="VD: 01 hóa đơn GTGT" />
                  </div>
                  <label className="col-sm-2 col-form-label">Trạng thái</label>
                  <div className="col-sm-4">
                    <Select classNamePrefix="select" options={STATUS} isSearchable={false}
                      value={STATUS.find((o) => o.value === stock_transaction.transaction_status)}
                      onChange={(o) => setStockTransaction((t) => ({ ...t, transaction_status: o.value }))} />
                  </div>
                </Form.Group>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Chi tiết */}
      <div className="row">
        <div className="col-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Chi tiết phiếu nhập kho</h4>
              {errors.items && <div className="validation">{errors.items}</div>}
              <div className="table-responsive">
                <table className="table table-bordered inside_table insert-import-table">
                  <thead>
                    <tr>
                      <th style={{ width: '50px' }}> STT </th>
                      <th style={{ width: '130px' }}> Mã VT </th>
                      <th style={{ minWidth: '220px' }}> Tên VT </th>
                      <th style={{ width: '70px' }}> TK nợ </th>
                      <th style={{ width: '70px' }}> TK có </th>
                      <th style={{ width: '60px' }}> ĐVT </th>
                      <th style={{ width: '120px' }}> SL </th>
                      <th style={{ width: '80px' }}> HSQĐ(kg) </th>
                      <th style={{ width: '110px' }}> SLQĐ(kg) </th>
                      <th style={{ width: '180px' }}> Vị trí </th>
                      <th style={{ width: '130px' }}> Đơn giá </th>
                      <th style={{ width: '140px' }}> Thành tiền </th>
                      <th style={{ width: '44px' }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, i) => {
                      const q = toNumber(item.quantity);
                      return (
                        <tr key={item.index} className={errors['dup_' + item.index] ? 'row-error' : ''}>
                          <td className="center">{i + 1}</td>
                          <td>{item.code}</td>
                          <td className="wrap">{item.name}</td>
                          <td className="center">{item.tk_no}</td>
                          <td className="center">{item.tk_co}</td>
                          <td className="center">{item.unit}</td>
                          <td>
                            <Form.Control type="text" name="quantity" value={item.quantity} autoComplete="off"
                              className={'right' + (errors['quantity_' + item.index] ? ' is-invalid' : '')}
                              onChange={(e) => handleItemsChange(i, e)} />
                          </td>
                          <td className="right">{item.unit_to_kg}</td>
                          <td className="right">{fmt(q * (Number(item.unit_to_kg) || 0))}</td>
                          <td className={errors['position_' + item.index] ? 'cell-error' : ''}>
                            <Select classNamePrefix="select" {...selectPortal}
                              options={positionOptions} isClearable
                              isDisabled={!stock_transaction.stock_id}
                              placeholder={stock_transaction.stock_id ? 'Chọn kệ...' : 'Chọn kho trước'}
                              noOptionsMessage={() => 'Kho chưa có kệ'}
                              filterOption={filterOption}
                              value={item.position ? { value: item.position, label: item.position } : null}
                              onChange={(o) => setPosition(i, o)} />
                          </td>
                          <td>
                            <Form.Control type="text" name="price" value={item.price} autoComplete="off" placeholder="0"
                              className="right" onChange={(e) => handleItemsChange(i, e)} />
                          </td>
                          <td className="right strong">{fmt(q * toNumber(item.price))}</td>
                          <td className="center">
                            <button type="button" className="btn btn-inverse-danger btn-icon remove-line" title="Xóa dòng" onClick={() => handleRemove(item)}>
                              <i className="mdi mdi-delete"></i>
                            </button>
                          </td>
                        </tr>
                      );
                    })}

                    {/* Dòng thêm vật tư */}
                    <tr className="add-row">
                      <td className="center"><i className="mdi mdi-plus text-primary"></i></td>
                      <td colSpan="5">
                        <Select classNamePrefix="select" {...selectPortal}
                          options={productOptions} value={null}
                          placeholder="Thêm vật tư: gõ mã hoặc tên để tìm..."
                          noOptionsMessage={() => 'Không tìm thấy vật tư'}
                          filterOption={filterOption}
                          formatOptionLabel={(o, { context }) => context === 'menu'
                            ? <div className="product-option"><b>{o.product.code}</b><span>{o.product.name}</span><small>{o.product.unit}{usedCodes.has(o.value) ? ' · đã có trong phiếu' : ''}</small></div>
                            : o.label}
                          onChange={addProduct} />
                      </td>
                      <td colSpan="7"></td>
                    </tr>
                  </tbody>
                  {items.length > 0 && (
                    <tfoot>
                      <tr className="total-row">
                        <td colSpan="6" className="right">Tổng cộng ({items.length} dòng)</td>
                        <td className="right">{fmt(totals.quantity)}</td>
                        <td></td>
                        <td className="right">{fmt(totals.kg)}</td>
                        <td></td>
                        <td></td>
                        <td className="right">{fmt(totals.amount)}</td>
                        <td></td>
                      </tr>
                    </tfoot>
                  )}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Alert message={alert_message} show={alert_show} onClose={() => setAlertShow(false)} />
    </div>
  )
}

export default Insert
