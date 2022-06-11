import React, { useState, useEffect } from 'react'
import 'react-complex-tree/lib/style.css';
import { Form } from 'react-bootstrap';
import Modal from '../components/Modal';
import Alert from '../components/Alert';
import Validator from '../../utils/validator';
import Common from '../../utils/common';
import { fetchWrapper } from '../../utils/fetch-wrapper';
import { useHistory } from "react-router-dom";

import { alpha, makeStyles, withStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import IndeterminateCheckBoxOutlinedIcon from '@material-ui/icons/IndeterminateCheckBoxOutlined';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined';

function List() {
  const root_id = 1;
  const [selected_stock, setSelectedStock] = useState(null);
  const [expandedItems, setExpandedItems] = useState([]);
  const [selectedId, setSelectedId] = useState(0);
  const [stock_groups, setStockGroups] = useState();
  const [stocks, setStocks] = useState([]);
  const [display_stocks, setDisplayStocks] = useState([]);

  let history = useHistory();
  //model stock_group
  const [model_stock_group_title, setModelStockGroupTitle] = useState();
  const [showStockGroupModel, setShowStockGroupModel] = useState(false);
  const [stock_group_errors, setStockGroupErrors] = useState({});
  const [stock_group, setStockGroup] = useState({ id: 0, code: "", name: "", description: "" });
  const handleStockGroupChange = (event) => {
    event.persist();
    setStockGroup({ ...stock_group, [event.target.name]: event.target.value });
  };
  const [modelOrgType, setModelOrgType] = useState(0);

  //model stock
  const [model_stock_title, setModelStockTitle] = useState();
  const [showStockModel, setShowStockModel] = useState(false);
  const [stock_errors, setStockErrors] = useState({});
  const [stock, setStock] = useState({ id: 0, code: "", name: "", description: "", status: 1 });
  const handleStockChange = (event) => {
    event.persist();
    setStock({ ...stock, [event.target.name]: event.target.value });
  };  
  const handleStatusChange = (event) => {
    event.persist();
    setStock({ ...stock, status: event.target.checked })
}
  const [modelEmpType, setModelEmpType] = useState(0);

  //alert message
  const [alert_message, setAlertMessage] = useState('');
  const [alert_show, setAlertShow] = useState(false);

  const stock_group_rules = [
    {
      field: 'code',
      method: 'isEmpty',
      validWhen: false,
      message: 'Vui lòng nhập mã nhóm.',
    },
    {
      field: 'name',
      method: 'isEmpty',
      validWhen: false,
      message: 'Vui lòng nhập tên nhóm.',
    },
  ];
  const stock_group_validator = new Validator(stock_group_rules);

  const stock_rules = [
    {
      field: 'code',
      method: 'isEmpty',
      validWhen: false,
      message: 'Vui lòng nhập mã kho.',
    },
    {
      field: 'name',
      method: 'isEmpty',
      validWhen: false,
      message: 'Vui lòng nhập họ tên.',
    }
  ];
  const stock_validator = new Validator(stock_rules);

  const stock_insert_rules = [
    {
      field: 'code',
      method: 'isEmpty',
      validWhen: false,
      message: 'Vui lòng nhập mã kho.',
    },
    {
      field: 'name',
      method: 'isEmpty',
      validWhen: false,
      message: 'Vui lòng nhập họ tên.',
    }
  ];
  const stock_insert_validator = new Validator(stock_insert_rules);

  useEffect(() => {
    fetchStockGroup()
  }, [])

  function fetchStockGroup() {
    try {
      fetchWrapper.get(process.env.REACT_APP_API_URL + 'stock_groups').then((data) => {
        if (data.success) {
          console.log(data.data.stockGroups)          
          setExpandedItems(data.data.ids)
          setStockGroups(data.data.stockGroups)
          setStocks(data.data.stocks)
          setSelectedStock(null)
        }
      })
    } catch (error) {
      console.error(error);
    }
  }

  function handleOpenStockModel(type) {   
    setModelEmpType(type)
    setStockErrors({})
    if (type === 1) {
      if (selectedId < 1) {
        setAlertMessage('Vui lòng chọn nhóm để thêm kho')
        setAlertShow(true)
        return
      }
      const selectedStockGroups = stock_groups.filter(
        (stock_group) => stock_group.id.toString() === selectedId.toString()
      );
      if (selectedStockGroups.length === 0) {
        setAlertMessage('Vui lòng chọn nhóm để thêm kho')
        setAlertShow(true)
        return
      }
      let selectedStockGroup = selectedStockGroups[0];
      if (selectedStockGroup.hasOwnProperty('childs') && selectedStockGroup.childs.length > 0) {
        setAlertMessage('Không được thêm kho cho nhóm cha')
        setAlertShow(true)
        return
      } else {
        let current_id = selectedId
        let stock_code = '';
        let stock_name = '';
        if (current_id) {
          while (current_id != root_id) {
            var group = stock_groups.filter(
              (stock_group) => stock_group.id.toString() === current_id.toString()
            )[0];
            stock_code = group.code + '-' + stock_code
            stock_name = group.name + ' ' + stock_name
            current_id = group.parent_id
          }
          stock_code = stock_code + Common.ConvertToString(display_stocks.length + 1, 3)
          stock_name = stock_name + Common.ConvertToString(display_stocks.length + 1, 3)
        }
        setModelStockTitle('Thêm kho')
        setStock({ ...stock, "code": stock_code, "name": stock_name, "description": '', "status": 1 });
        setShowStockModel(true)
      }
    } else if (type === 2) {
      if (selectedId < 1) {
        setAlertMessage('Vui lòng chọn nhóm kho')
        setAlertShow(true)
        return
      }
      if (selected_stock === null) {
        setAlertMessage('Vui lòng chọn kho để sửa')
        setAlertShow(true)
        return
      }
      setModelStockTitle('Sửa thông tin kho')
      setStock({
        ...stock,
        "id": selected_stock.id,
        "code": selected_stock.code,
        "name": selected_stock.name,
        "description": selected_stock.description,
        "status": selected_stock.status
      });
      setShowStockModel(true)
    } else if (type === 3) {
      if (selectedId < 1) {
        setAlertMessage('Vui lòng chọn nhóm kho')
        setAlertShow(true)
        return
      }
      if (selected_stock === null) {
        setAlertMessage('Vui lòng chọn kho để xem')
        setAlertShow(true)
        return
      }
      setModelStockTitle('Xem thông tin kho')
      setStock({
        ...stock,
        "id": selected_stock.id,
        "code": selected_stock.code,
        "name": selected_stock.name,
        "description": selected_stock.description,
        "status": selected_stock.status
      });
      setShowStockModel(true)
    } else if (type === 4) {
      if (selectedId < 1) {
        setAlertMessage('Vui lòng chọn nhóm kho')
        setAlertShow(true)
        return
      }
      if (selected_stock === null) {
        setAlertMessage('Vui lòng chọn kho để xóa')
        setAlertShow(true)
        return
      }
      setModelStockTitle('Xóa thông tin kho')
      setStock({
        ...stock,
        "id": selected_stock.id,
        "code": selected_stock.code,
        "name": selected_stock.name,
        "description": selected_stock.description,
        "status": selected_stock.status
      });
      setShowStockModel(true)
    }
  }

  function handleSaveStock() {
    if (selectedId < 1) {
      setAlertMessage('Vui lòng chọn nhóm kho')
      setAlertShow(true)
      return
    }
    const selected_id = parseInt(selectedId)
    if (modelEmpType === 1) {
      const current_errors = stock_insert_validator.validate(stock)
      setStockErrors(current_errors)
      if (!Common.isEmptyObject(current_errors)) {
        return
      }
      const body = {
        code: stock.code,
        name: stock.name,
        description: stock.description,
        status: stock.status,
        group_id: selected_id
      }
      try {
        fetchWrapper.post(process.env.REACT_APP_API_URL + 'stocks/insert', body).then((data) => {
          setShowStockModel(false)
          if (data.success) {
            setSelectedStock(null)
            fetchStockGroup()
          } else {
            setAlertMessage('Có lỗi xảy ra trong quá trình thực hiện')
            setAlertShow(true)
          }
        })
      } catch (error) {
        console.error(error);
      }
    } else if (modelEmpType === 2) {
      const current_errors = stock_validator.validate(stock)
      setStockErrors(current_errors)
      if (!Common.isEmptyObject(current_errors)) {
        return
      }
      const body = {
        code: stock.code,
        name: stock.name,
        description: stock.description,
        status: stock.status,
        group_id: selected_id
      }
      try {
        fetchWrapper.put(process.env.REACT_APP_API_URL + 'stocks/' + stock.id + '/update', body).then((data) => {
          setShowStockModel(false)
          if (data.success) {
            setSelectedStock(null)
            fetchStockGroup()
          } else {
            setAlertMessage('Có lỗi xảy ra trong quá trình thực hiện')
            setAlertShow(true)
          }
        })
      } catch (error) {
        console.error(error);
      }
    } else if (modelEmpType === 4) {
      try {
        fetchWrapper.delete(process.env.REACT_APP_API_URL + 'stocks/' + stock.id + '/delete').then((data) => {
          setShowStockModel(false)
          if (data.success) {
            setSelectedStock(null)
            fetchStockGroup()
          } else {
            setAlertMessage('Có lỗi xảy ra trong quá trình thực hiện')
            setAlertShow(true)
          }
        })
      } catch (error) {
        console.error(error);
      }
    }
  }

  function handleOpenStockGroupModel(type) {
    setModelOrgType(type)
    setStockGroupErrors({})
    if (type === 1) {
      if (selectedId < 1) {
        setAlertMessage('Vui lòng chọn nhóm cha để thêm nhóm kho')
        setAlertShow(true)
        return
      }
      if (display_stocks && display_stocks.length > 0) {
        setAlertMessage('Không được tạo nhóm con cho nhóm đã có kho')
        setAlertShow(true)
        return
      }
      setModelStockGroupTitle('Thêm nhóm kho')
      setStockGroup({ ...stock_group, "code": '', "name": '', "desc": '' });
      setShowStockGroupModel(true)
    } else if (type === 2) {
      if (selectedId < 1) {
        setAlertMessage('Vui lòng chọn nhóm kho để sửa')
        setAlertShow(true)
        return
      }
      const selectedStockGroup = stock_groups.filter(
        (stock_group) => stock_group.id.toString() === selectedId.toString()
      )[0];
      setModelStockGroupTitle('Sửa nhóm kho')
      setStockGroup({ ...stock_group, "code": selectedStockGroup.code, "name": selectedStockGroup.name, "desc": selectedStockGroup.description });
      console.log(stock_group)
      setShowStockGroupModel(true)
    } else if (type === 3) {
      if (selectedId < 1) {
        setAlertMessage('Vui lòng chọn nhóm kho để xem')
        setAlertShow(true)
        return
      }
      const selectedStockGroup = stock_groups.filter(
        (stock_group) => stock_group.id.toString() === selectedId.toString()
      )[0];
      setModelStockGroupTitle('Xem nhóm kho')
      setStockGroup({ ...stock_group, "code": selectedStockGroup.code, "name": selectedStockGroup.name, "desc": selectedStockGroup.description });
      setShowStockGroupModel(true)
    } else if (type === 4) {
      if (selectedId < 1) {
        setAlertMessage('Vui lòng chọn nhóm kho để xóa')
        setAlertShow(true)
        return
      }
      const selectedStockGroup = stock_groups.filter(
        (stock_group) => stock_group.id.toString() === selectedId.toString()
      )[0];
      if (Array.isArray(selectedStockGroup.childs)) {
        setAlertMessage('Không được xóa nhóm kho cha')
        setAlertShow(true)
        return
      }
      if(selectedStockGroup.parent_id === root_id){
        setAlertMessage('Không được xóa nhóm kho gốc')
        setAlertShow(true)
        return
      }
      if (display_stocks && display_stocks.length > 0) {
        setAlertMessage('Không được xóa nhóm kho có kho')
        setAlertShow(true)
        return
      }
      setModelStockGroupTitle('Xóa nhóm kho')
      setStockGroup({ ...stock_group, "code": selectedStockGroup.code, "name": selectedStockGroup.name, "desc": selectedStockGroup.description });
      setShowStockGroupModel(true)
    }
  }

  function handleSaveStockGroup() {
    if (selectedId < 1) {
      setAlertMessage('Vui lòng chọn nhóm kho')
      setAlertShow(true)
      return
    }
    const current_errors = stock_group_validator.validate(stock_group)
    setStockGroupErrors(current_errors)
    if (!Common.isEmptyObject(current_errors)) {
      return
    }
    const selected_id = parseInt(selectedId)
    if (modelOrgType === 1) {
      const body = {
        code: stock_group.code,
        name: stock_group.name,
        description: stock_group.desc,
        parent_id: selected_id
      }
      try {
        fetchWrapper.post(process.env.REACT_APP_API_URL + "stock_groups/insert", body).then((data) => {
          setShowStockGroupModel(false)
          if (data.success) {
            fetchStockGroup()
          } else {
            setAlertMessage('Có lỗi xảy ra trong quá trình thực hiện')
            setAlertShow(true)
          }
        })
      } catch (error) {
        console.error(error);
      }
    } else if (modelOrgType === 2) {
      const body = {
        code: stock_group.code,
        name: stock_group.name,
        description: stock_group.desc
      }
      try {
        fetchWrapper.put(process.env.REACT_APP_API_URL + 'stock_groups/' + selected_id + '/update', body).then((data) => {
          setShowStockGroupModel(false)
          if (data.success) {
            fetchStockGroup()
          } else {
            setAlertMessage('Có lỗi xảy ra trong quá trình thực hiện')
            setAlertShow(true)
          }
        })
      } catch (error) {
        console.error(error);
      }
    } else if (modelOrgType === 4) {
      try {
        fetchWrapper.delete(process.env.REACT_APP_API_URL + 'stock_groups/' + selected_id + '/delete').then((data) => {
          setShowStockGroupModel(false)
          if (data.success) {
            fetchStockGroup()
          } else {
            setAlertMessage('Có lỗi xảy ra trong quá trình thực hiện')
            setAlertShow(true)
          }
        })
      } catch (error) {
        console.error(error);
      }
    }
  }

  function viewLayout(){
    if (selected_stock === null) {
      setAlertMessage('Vui lòng chọn kho để xem layout')
      setAlertShow(true)
      return
    }
    history.push("/stocks/layout/" + selected_stock.id);
  }

  useEffect(() => {
    const selected_id = parseInt(selectedId)
    const temp_stocks = stocks.filter(
      (stock) => stock.group_id === selected_id
    );
    setDisplayStocks(temp_stocks)
    setSelectedStock(null)    
  }, [stocks, selectedId])


  const useStyles = makeStyles({
    root: {
      maxWidth: 400,
    },
  });

  const StyledTreeItem = withStyles((theme) => ({
    iconContainer: {
      '& .close': {
        opacity: 0.3,
      },
    },
    group: {
      marginLeft: 7,
      paddingLeft: 18,
      borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
    },
  }))((props) => <TreeItem {...props}  />);

  const classes = useStyles();
  const handleSelect = (event, nodeId) => {
    setSelectedId(nodeId)
  };

  const renderTree = (nodes) => (
    <StyledTreeItem  key={nodes.id.toString()} nodeId={nodes.id.toString()} label={nodes.name} onLabelClick={(event) => event.preventDefault()}>
      {Array.isArray(nodes.childs)
        ? nodes.childs.map((node) => renderTree(node))
        : null}
    </StyledTreeItem >
  );

  return (    
    <div>
      <div className="page-header">
        <h3 className="page-title"> Quản lý nhóm kho và danh sách kho </h3>
      </div>
      <div className="row">
        <div className="col-lg-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div>
                <h4 className="card-title fl-left">Nhóm kho</h4>
                <div className='fl-right mb-10'>
                  <button type="button" className="btn btn-primary btn-icon small_button" title="Thêm nhóm kho" onClick={() => handleOpenStockGroupModel(1)}><i className="mdi mdi-plus-box"></i></button>
                  <button type="button" className="btn btn-success btn-icon small_button ml-10" title="Sửa nhóm kho" onClick={() => handleOpenStockGroupModel(2)}><i className="mdi mdi-pencil"></i></button>
                  <button type="button" className="btn btn-warning btn-icon small_button ml-10" title="Xem nhóm kho" onClick={() => handleOpenStockGroupModel(3)}><i className="mdi mdi-eye"></i></button>
                  <button type="button" className="btn btn-danger btn-icon small_button ml-10" title="Xóa nhóm kho" onClick={() => handleOpenStockGroupModel(4)}><i className="mdi mdi-delete"></i></button>
                </div>
                <div className='clear-both'></div>
              </div>
              <div className='tree-wrapper'>   
                <style>{`
                  :root {        
                    --rct-item-height: 32px;
                  }
                  .rct-tree-item-li {
                    font-size: 1.0rem;
                  }
                `}</style>
                {!Common.isEmptyObject(stock_groups) &&
                  <TreeView onNodeSelect={handleSelect}
                    className={classes.root}
                    aria-label="rich object"
                    defaultExpanded={expandedItems}
                    defaultCollapseIcon={<IndeterminateCheckBoxOutlinedIcon />}
                    defaultExpandIcon={<AddBoxOutlinedIcon />}
                    defaultEndIcon={<CheckBoxOutlineBlankOutlinedIcon />}
                  >
                    {renderTree(stock_groups[0])}
                  </TreeView>
                }
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div>
                <h4 className="card-title fl-left">Danh mục kho</h4>
                <div className='fl-right mb-10'>
                  <button type="button" className="btn btn-primary btn-icon small_button" title="Thêm kho" onClick={() => handleOpenStockModel(1)}><i className="mdi mdi-plus-box"></i> </button>
                  <button type="button" className="btn btn-success btn-icon small_button ml-10" title="Sửa kho" onClick={() => handleOpenStockModel(2)}><i className="mdi mdi-pencil"></i> </button>
                  <button type="button" className="btn btn-warning btn-icon small_button ml-10" title="Xem kho" onClick={() => handleOpenStockModel(3)}><i className="mdi mdi-eye"></i> </button>
                  <button type="button" className="btn btn-info btn-icon small_button ml-10" title="Xem layout" onClick={() => viewLayout()}><i className="mdi mdi-server"></i> </button>
                  <button type="button" className="btn btn-danger btn-icon small_button ml-10" title="Xóa kho" onClick={() => handleOpenStockModel(4)}><i className="mdi mdi-delete"></i> </button>
                </div>
                <div className='clear-both'></div>
              </div>
              <div className='table-wrapper'>
                <div className="table-responsive">
                  <table className="table table-hover stocks">
                    <thead>
                      <tr>
                        <th className='td_wrapper_300' style={{ width: '60px' }}>Mã kho</th>
                        <th className='td_wrapper_300' style={{ width: '200px' }}>Tên kho</th>
                        <th style={{ width: '200px' }}>Mô tả</th>
                        <th style={{ width: '60px' }}>Trạng thái</th>
                      </tr>
                    </thead>
                    <tbody>
                      {display_stocks && display_stocks.map(function (stock, index) {
                        return (
                          <tr key={"stock-" + index} className={selected_stock && selected_stock.id === stock.id ? 'selected-row' : ''} onClick={() => setSelectedStock(stock)}>
                            <td className='td_wrapper_300'>{stock.code}</td>
                            <td className='td_wrapper_300'>{stock.name}</td>
                            <td>{stock.description}</td>
                            <td>
                              {stock.status === 1 && <label className="badge badge-success">Hoạt động</label>}
                              {stock.status === 0 && <label className="badge badge-warning">Tạm dừng</label>}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  {(!display_stocks || display_stocks.length === 0) && (
                    <div className='center'>Không có bản ghi nào</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* model stock_group */}
      <Modal showOverlay={true} size={'md'} show={showStockGroupModel} onClose={() => { setShowStockGroupModel(false) }}>
        <Modal.Header>
          <Modal.Title>
            {model_stock_group_title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="row">
            <label htmlFor="code" className="col-form-label col-sm-3">Mã nhóm<span>*</span></label>
            <div className="col-sm-9">
              <Form.Control type="text" required readOnly={modelOrgType === 3 || modelOrgType === 4} name="code" value={stock_group.code} onChange={handleStockGroupChange} className="form-control" placeholder="" />
              {stock_group_errors.code && <div className="validation">{stock_group_errors.code}</div>}
            </div>
            <div className="validation"></div>
          </Form.Group>
          <Form.Group className="row">
            <label htmlFor="name" className="col-form-label col-sm-3">Tên nhóm<span>*</span></label>
            <div className="col-sm-9">
              <Form.Control type="text" required readOnly={modelOrgType === 3 || modelOrgType === 4} name="name" value={stock_group.name} onChange={handleStockGroupChange} className="form-control" placeholder="" />
              {stock_group_errors.name && <div className="validation">{stock_group_errors.name}</div>}
            </div>
            <div className="validation"></div>
          </Form.Group>
          <Form.Group className="row">
            <label htmlFor="description" className="col-form-label col-sm-3">Mô tả</label>
            <div className="col-sm-9">
              <textarea className="form-control" readOnly={modelOrgType === 3 || modelOrgType === 4} name="desc" value={stock_group.desc} onChange={handleStockGroupChange} rows="4"></textarea>
            </div>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          {(modelOrgType === 1 || modelOrgType === 2) &&
            <button type="button" className="btn btn-primary btn-icon small_button" onClick={() => handleSaveStockGroup()}>Lưu</button>
          }
          {(modelOrgType === 4) &&
            <button type="button" className="btn btn-danger btn-icon small_button" onClick={() => handleSaveStockGroup()}>Xóa</button>
          }
          <button type="button" className="btn btn-secondary btn-icon small_button" onClick={() => { setShowStockGroupModel(false) }}>Đóng</button>
        </Modal.Footer>
      </Modal>
      {/* model stock */}
      <Modal showOverlay={true} size={'lg'} show={showStockModel} onClose={() => { setShowStockModel(false) }}>
        <Modal.Header>
          <Modal.Title>
            {model_stock_title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="row">
            <label htmlFor="code" className="col-form-label col-sm-2">Mã kho<span>*</span></label>
            <div className="col-sm-10">
              <Form.Control type="text" readOnly={[3, 4, 5].includes(modelEmpType)} name="code" value={stock.code} onChange={handleStockChange} className="form-control" placeholder="" />
              {stock_errors.code && <div className="validation">{stock_errors.code}</div>}
            </div>
          </Form.Group>
          <Form.Group className="row">
            <label htmlFor="name" className="col-form-label col-sm-2">Tên kho<span>*</span></label>
            <div className="col-sm-10">
              <Form.Control type="text" readOnly={[3, 4, 5].includes(modelEmpType)} name="name" value={stock.name} onChange={handleStockChange} className="form-control" placeholder="" />
              {stock_errors.name && <div className="validation">{stock_errors.name}</div>}
            </div>
          </Form.Group>
          <Form.Group className="row">
          </Form.Group>
          <Form.Group className="row">
            <label htmlFor="description" className="col-form-label col-sm-2">Mô tả</label>
            <div className="col-sm-10">
              <textarea className="form-control" readOnly={[3, 4, 5].includes(modelEmpType)} name="description" value={stock.description} onChange={handleStockChange} rows="4"></textarea>
            </div>
          </Form.Group>
          <Form.Group className="row">
            <label htmlFor="description" className="col-form-label col-sm-2">Trạng thái</label>
            <div className="col-sm-10">
              <div className="form-check">
                <label className="form-check-label text-muted">
                  <input type="checkbox" className="form-check-input" name='status' checked={stock.status} onChange={handleStatusChange}/>
                  <i className="input-helper"></i>
                  Hoạt động
                </label>
              </div>
            </div>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          {([1, 2, 5].includes(modelEmpType)) &&
            <button type="button" className="btn btn-primary btn-icon small_button" onClick={() => handleSaveStock()}>Lưu</button>
          }
          {(modelEmpType === 4) &&
            <button type="button" className="btn btn-danger btn-icon small_button" onClick={() => handleSaveStock()}>Xóa</button>
          }
          <button type="button" className="btn btn-secondary btn-icon small_button" onClick={() => { setShowStockModel(false) }}>Đóng</button>
        </Modal.Footer>
      </Modal>
      {/* model alert */}
      <Alert message={alert_message} show={alert_show} onClose={() => setAlertShow(false)} />
    </div>
  )
}
export default List
