import React, { useState, useEffect } from 'react'
import 'react-complex-tree/lib/style.css';
import { Form } from 'react-bootstrap';
import Modal from '../components/Modal';
import Alert from '../components/Alert';
import Validator from '../../utils/validator';
import Common from '../../utils/common';
import { fetchWrapper } from '../../utils/fetch-wrapper';

import { alpha, makeStyles, withStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import IndeterminateCheckBoxOutlinedIcon from '@material-ui/icons/IndeterminateCheckBoxOutlined';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined';

function ProductsList() {
  const root_id = 3;
  const category_type = 3;
  const [selected_product, setSelectedProduct] = useState(null);
  const [expandedItems, setExpandedItems] = useState([]);
  const [selectedId, setSelectedId] = useState(0);
  const [product_groups, setProductGroups] = useState();
  const [products, setProducts] = useState([]);
  const [display_products, setDisplayProducts] = useState([]);

  //model product_group
  const [model_product_group_title, setModelProductGroupTitle] = useState();
  const [showProductGroupModel, setShowProductGroupModel] = useState(false);
  const [product_group_errors, setProductGroupErrors] = useState({});
  const [product_group, setProductGroup] = useState({ id: 0, code: "", name: "", description: "" });
  const handleProductGroupChange = (event) => {
    event.persist();
    setProductGroup({ ...product_group, [event.target.name]: event.target.value });
  };
  const [modelOrgType, setModelOrgType] = useState(0);

  //model product
  const [model_product_title, setModelProductTitle] = useState();
  const [showProductModel, setShowProductModel] = useState(false);
  const [product_errors, setProductErrors] = useState({});
  const [product, setProduct] = useState({ id: 0, code: "", name: "", description: "", manufactor: "", origin: "", status: 1 });
  const handleProductChange = (event) => {
    event.persist();
    setProduct({ ...product, [event.target.name]: event.target.value });
  };  
  const handleStatusChange = (event) => {
    event.persist();
    setProduct({ ...product, status: event.target.checked })
}
  const [modelEmpType, setModelEmpType] = useState(0);

  //alert message
  const [alert_message, setAlertMessage] = useState('');
  const [alert_show, setAlertShow] = useState(false);

  const product_group_rules = [
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
  const product_group_validator = new Validator(product_group_rules);

  const product_rules = [
    {
      field: 'code',
      method: 'isEmpty',
      validWhen: false,
      message: 'Vui lòng nhập mã sản phẩm.',
    },
    {
      field: 'name',
      method: 'isEmpty',
      validWhen: false,
      message: 'Vui lòng nhập họ tên.',
    }
  ];
  const product_validator = new Validator(product_rules);

  const product_insert_rules = [
    {
      field: 'code',
      method: 'isEmpty',
      validWhen: false,
      message: 'Vui lòng nhập mã sản phẩm.',
    },
    {
      field: 'name',
      method: 'isEmpty',
      validWhen: false,
      message: 'Vui lòng nhập họ tên.',
    }
  ];
  const product_insert_validator = new Validator(product_insert_rules);

  useEffect(() => {
    fetchProductGroup()
  }, [])

  function fetchProductGroup() {
    try {
      fetchWrapper.get(process.env.REACT_APP_API_URL + 'product_groups?type=' + category_type).then((data) => {
        if (data.success) {
          console.log(data.data.product_groups)          
          setExpandedItems(data.data.ids)
          setProductGroups(data.data.product_groups)
          setProducts(data.data.products)
          setSelectedProduct(null)
        }
      })
    } catch (error) {
      console.error(error);
    }
  }

  function handleOpenProductModel(type) {   
    setModelEmpType(type)
    setProductErrors({})
    if (type === 1) {
      if (selectedId < 1) {
        setAlertMessage('Vui lòng chọn nhóm để thêm sản phẩm')
        setAlertShow(true)
        return
      }
      const selectedProductGroups = product_groups.filter(
        (product_group) => product_group.id.toString() === selectedId.toString()
      );
      if (selectedProductGroups.length === 0) {
        setAlertMessage('Vui lòng chọn nhóm để thêm sản phẩm')
        setAlertShow(true)
        return
      }
      let selectedProductGroup = selectedProductGroups[0];
      if (selectedProductGroup.hasOwnProperty('childs') && selectedProductGroup.childs.length > 0) {
        setAlertMessage('Không được thêm sản phẩm cho nhóm cha')
        setAlertShow(true)
        return
      } else {
        let current_id = selectedId
        let product_code = '';
        let product_name = '';
        if (current_id) {
          while (current_id !== root_id) {
            var group = product_groups.filter(
              (product_group) => product_group.id.toString() === current_id.toString()
            )[0];
            product_code = group.code + '-' + product_code
            product_name = group.name + ' ' + product_name
            current_id = group.parent_id
          }
          product_code = product_code + Common.ConvertToString(display_products.length + 1, 3)
          product_name = product_name + Common.ConvertToString(display_products.length + 1, 3)
        }
        setModelProductTitle('Thêm sản phẩm')
        setProduct({ ...product, "code": product_code, "name": product_name, "description": '', "manufactor": '', "origin": '', "status": 1 });
        setShowProductModel(true)
      }
    } else if (type === 2) {
      if (selectedId < 1) {
        setAlertMessage('Vui lòng chọn nhóm sản phẩm')
        setAlertShow(true)
        return
      }
      if (selected_product === null) {
        setAlertMessage('Vui lòng chọn sản phẩm để sửa')
        setAlertShow(true)
        return
      }
      setModelProductTitle('Sửa thông tin sản phẩm')
      setProduct({
        ...product,
        "id": selected_product.id,
        "code": selected_product.code,
        "name": selected_product.name,
        "description": selected_product.description,
        "manufactor": selected_product.manufactor,
        "origin": selected_product.origin,
        "status": selected_product.status
      });
      setShowProductModel(true)
    } else if (type === 3) {
      if (selectedId < 1) {
        setAlertMessage('Vui lòng chọn nhóm sản phẩm')
        setAlertShow(true)
        return
      }
      if (selected_product === null) {
        setAlertMessage('Vui lòng chọn sản phẩm để xem')
        setAlertShow(true)
        return
      }
      setModelProductTitle('Xem thông tin sản phẩm')
      setProduct({
        ...product,
        "id": selected_product.id,
        "code": selected_product.code,
        "name": selected_product.name,
        "description": selected_product.description,
        "manufactor": selected_product.manufactor,
        "origin": selected_product.origin,
        "status": selected_product.status
      });
      setShowProductModel(true)
    } else if (type === 4) {
      if (selectedId < 1) {
        setAlertMessage('Vui lòng chọn nhóm sản phẩm')
        setAlertShow(true)
        return
      }
      if (selected_product === null) {
        setAlertMessage('Vui lòng chọn sản phẩm để xóa')
        setAlertShow(true)
        return
      }
      setModelProductTitle('Xóa thông tin sản phẩm')
      setProduct({
        ...product,
        "id": selected_product.id,
        "code": selected_product.code,
        "name": selected_product.name,
        "description": selected_product.description,
        "manufactor": selected_product.manufactor,
        "origin": selected_product.origin,
        "status": selected_product.status
      });
      setShowProductModel(true)
    }
  }

  function handleSaveProduct() {
    if (selectedId < 1) {
      setAlertMessage('Vui lòng chọn nhóm sản phẩm')
      setAlertShow(true)
      return
    }
    const selected_id = parseInt(selectedId)
    if (modelEmpType === 1) {
      const current_errors = product_insert_validator.validate(product)
      setProductErrors(current_errors)
      if (!Common.isEmptyObject(current_errors)) {
        return
      }
      const body = {
        code: product.code,
        name: product.name,
        description: product.description,
        manufactor: product.manufactor,
        origin: product.origin,
        status: product.status,
        group_id: selected_id,
        type: category_type
      }
      try {
        fetchWrapper.post(process.env.REACT_APP_API_URL + 'products/insert', body).then((data) => {
          setShowProductModel(false)
          if (data.success) {
            setSelectedProduct(null)
            fetchProductGroup()
          } else {
            setAlertMessage('Có lỗi xảy ra trong quá trình thực hiện')
            setAlertShow(true)
          }
        })
      } catch (error) {
        console.error(error);
      }
    } else if (modelEmpType === 2) {
      const current_errors = product_validator.validate(product)
      setProductErrors(current_errors)
      if (!Common.isEmptyObject(current_errors)) {
        return
      }
      const body = {
        code: product.code,
        name: product.name,
        description: product.description,
        manufactor: product.manufactor,
        origin: product.origin,
        status: product.status,
        group_id: selected_id
      }
      try {
        fetchWrapper.put(process.env.REACT_APP_API_URL + 'products/' + product.id + '/update', body).then((data) => {
          setShowProductModel(false)
          if (data.success) {
            setSelectedProduct(null)
            fetchProductGroup()
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
        fetchWrapper.delete(process.env.REACT_APP_API_URL + 'products/' + product.id + '/delete').then((data) => {
          setShowProductModel(false)
          if (data.success) {
            setSelectedProduct(null)
            fetchProductGroup()
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

  function handleOpenProductGroupModel(type) {
    setModelOrgType(type)
    setProductGroupErrors({})
    if (type === 1) {
      if (selectedId < 1) {
        setAlertMessage('Vui lòng chọn nhóm cha để thêm nhóm sản phẩm')
        setAlertShow(true)
        return
      }
      if (display_products && display_products.length > 0) {
        setAlertMessage('Không được tạo nhóm con cho nhóm đã có sản phẩm')
        setAlertShow(true)
        return
      }
      setModelProductGroupTitle('Thêm nhóm sản phẩm')
      setProductGroup({ ...product_group, "code": '', "name": '', "desc": '' });
      setShowProductGroupModel(true)
    } else if (type === 2) {
      if (selectedId < 1) {
        setAlertMessage('Vui lòng chọn nhóm sản phẩm để sửa')
        setAlertShow(true)
        return
      }
      const selectedProductGroup = product_groups.filter(
        (product_group) => product_group.id.toString() === selectedId.toString()
      )[0];
      setModelProductGroupTitle('Sửa nhóm sản phẩm')
      setProductGroup({ ...product_group, "code": selectedProductGroup.code, "name": selectedProductGroup.name, "desc": selectedProductGroup.description });
      console.log(product_group)
      setShowProductGroupModel(true)
    } else if (type === 3) {
      if (selectedId < 1) {
        setAlertMessage('Vui lòng chọn nhóm sản phẩm để xem')
        setAlertShow(true)
        return
      }
      const selectedProductGroup = product_groups.filter(
        (product_group) => product_group.id.toString() === selectedId.toString()
      )[0];
      setModelProductGroupTitle('Xem nhóm sản phẩm')
      setProductGroup({ ...product_group, "code": selectedProductGroup.code, "name": selectedProductGroup.name, "desc": selectedProductGroup.description });
      setShowProductGroupModel(true)
    } else if (type === 4) {
      if (selectedId < 1) {
        setAlertMessage('Vui lòng chọn nhóm sản phẩm để xóa')
        setAlertShow(true)
        return
      }
      const selectedProductGroup = product_groups.filter(
        (product_group) => product_group.id.toString() === selectedId.toString()
      )[0];
      if (Array.isArray(selectedProductGroup.childs)) {
        setAlertMessage('Không được xóa nhóm sản phẩm cha')
        setAlertShow(true)
        return
      }
      if(selectedProductGroup.parent_id === root_id){
        setAlertMessage('Không được xóa nhóm sản phẩm gốc')
        setAlertShow(true)
        return
      }
      if (display_products && display_products.length > 0) {
        setAlertMessage('Không được xóa nhóm sản phẩm có sản phẩm')
        setAlertShow(true)
        return
      }
      setModelProductGroupTitle('Xóa nhóm sản phẩm')
      setProductGroup({ ...product_group, "code": selectedProductGroup.code, "name": selectedProductGroup.name, "desc": selectedProductGroup.description });
      setShowProductGroupModel(true)
    }
  }

  function handleSaveProductGroup() {
    if (selectedId < 1) {
      setAlertMessage('Vui lòng chọn nhóm sản phẩm')
      setAlertShow(true)
      return
    }
    const current_errors = product_group_validator.validate(product_group)
    setProductGroupErrors(current_errors)
    if (!Common.isEmptyObject(current_errors)) {
      return
    }
    const selected_id = parseInt(selectedId)
    if (modelOrgType === 1) {
      const body = {
        code: product_group.code,
        name: product_group.name,
        description: product_group.desc,
        parent_id: selected_id,
        type: category_type
      }
      try {
        fetchWrapper.post(process.env.REACT_APP_API_URL + "product_groups/insert", body).then((data) => {
          setShowProductGroupModel(false)
          if (data.success) {
            fetchProductGroup()
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
        code: product_group.code,
        name: product_group.name,
        description: product_group.desc
      }
      try {
        fetchWrapper.put(process.env.REACT_APP_API_URL + 'product_groups/' + selected_id + '/update', body).then((data) => {
          setShowProductGroupModel(false)
          if (data.success) {
            fetchProductGroup()
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
        fetchWrapper.delete(process.env.REACT_APP_API_URL + 'product_groups/' + selected_id + '/delete').then((data) => {
          setShowProductGroupModel(false)
          if (data.success) {
            fetchProductGroup()
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

  useEffect(() => {
    const selected_id = parseInt(selectedId)
    const temp_products = products.filter(
      (product) => product.group_id === selected_id
    );
    setDisplayProducts(temp_products)
    setSelectedProduct(null)    
  }, [products, selectedId])


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
        <h3 className="page-title"> Quản lý danh mục </h3>
      </div>
      <div className="row">
        <div className="col-lg-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div>
                <h4 className="card-title fl-left">Nhóm sản phẩm</h4>
                <div className='fl-right mb-10'>
                  <button type="button" className="btn btn-primary btn-icon small_button" title="Thêm nhóm sản phẩm" onClick={() => handleOpenProductGroupModel(1)}><i className="mdi mdi-plus-box"></i></button>
                  <button type="button" className="btn btn-success btn-icon small_button ml-10" title="Sửa nhóm sản phẩm" onClick={() => handleOpenProductGroupModel(2)}><i className="mdi mdi-pencil"></i></button>
                  <button type="button" className="btn btn-warning btn-icon small_button ml-10" title="Xem nhóm sản phẩm" onClick={() => handleOpenProductGroupModel(3)}><i className="mdi mdi-eye"></i></button>
                  <button type="button" className="btn btn-danger btn-icon small_button ml-10" title="Xóa nhóm sản phẩm" onClick={() => handleOpenProductGroupModel(4)}><i className="mdi mdi-delete"></i></button>
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
                {!Common.isEmptyObject(product_groups) &&
                  <TreeView onNodeSelect={handleSelect}
                    className={classes.root}
                    aria-label="rich object"
                    defaultExpanded={expandedItems}
                    defaultCollapseIcon={<IndeterminateCheckBoxOutlinedIcon />}
                    defaultExpandIcon={<AddBoxOutlinedIcon />}
                    defaultEndIcon={<CheckBoxOutlineBlankOutlinedIcon />}
                  >
                    {renderTree(product_groups[1])}
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
                <h4 className="card-title fl-left">Danh mục sản phẩm</h4>
                <div className='fl-right mb-10'>
                  <button type="button" className="btn btn-primary btn-icon small_button" title="Thêm sản phẩm" onClick={() => handleOpenProductModel(1)}><i className="mdi mdi-plus-box"></i> </button>
                  <button type="button" className="btn btn-success btn-icon small_button ml-10" title="Sửa sản phẩm" onClick={() => handleOpenProductModel(2)}><i className="mdi mdi-pencil"></i> </button>
                  <button type="button" className="btn btn-warning btn-icon small_button ml-10" title="Xem sản phẩm" onClick={() => handleOpenProductModel(3)}><i className="mdi mdi-eye"></i> </button>
                  <button type="button" className="btn btn-danger btn-icon small_button ml-10" title="Xóa sản phẩm" onClick={() => handleOpenProductModel(4)}><i className="mdi mdi-delete"></i> </button>
                </div>
                <div className='clear-both'></div>
              </div>
              <div className='table-wrapper'>
                <div className="table-responsive">
                  <table className="table table-hover products">
                    <thead>
                      <tr>
                        <th className='td_wrapper_300' style={{ width: '60px' }}>Mã sản phẩm</th>
                        <th className='td_wrapper_300' style={{ width: '200px' }}>Tên sản phẩm</th>
                        <th style={{ width: '200px' }}>Mô tả</th>
                        <th style={{ width: '60px' }}>Trạng thái</th>
                      </tr>
                    </thead>
                    <tbody>
                      {display_products && display_products.map(function (product, index) {
                        return (
                          <tr key={"product-" + index} className={selected_product && selected_product.id === product.id ? 'selected-row' : ''} onClick={() => setSelectedProduct(product)}>
                            <td className='td_wrapper_300'>{product.code}</td>
                            <td className='td_wrapper_300'>{product.name}</td>
                            <td>{product.description}</td>
                            <td>
                              {product.status === 1 && <label className="badge badge-success">Hoạt động</label>}
                              {product.status === 0 && <label className="badge badge-warning">Tạm dừng</label>}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  {(!display_products || display_products.length === 0) && (
                    <div className='center'>Không có bản ghi nào</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* model product_group */}
      <Modal showOverlay={true} size={'md'} show={showProductGroupModel} onClose={() => { setShowProductGroupModel(false) }}>
        <Modal.Header>
          <Modal.Title>
            {model_product_group_title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="row">
            <label htmlFor="code" className="col-form-label col-sm-3">Mã nhóm<span>*</span></label>
            <div className="col-sm-9">
              <Form.Control type="text" required readOnly={modelOrgType === 3 || modelOrgType === 4} name="code" value={product_group.code} onChange={handleProductGroupChange} className="form-control" placeholder="" />
              {product_group_errors.code && <div className="validation">{product_group_errors.code}</div>}
            </div>
            <div className="validation"></div>
          </Form.Group>
          <Form.Group className="row">
            <label htmlFor="name" className="col-form-label col-sm-3">Tên nhóm<span>*</span></label>
            <div className="col-sm-9">
              <Form.Control type="text" required readOnly={modelOrgType === 3 || modelOrgType === 4} name="name" value={product_group.name} onChange={handleProductGroupChange} className="form-control" placeholder="" />
              {product_group_errors.name && <div className="validation">{product_group_errors.name}</div>}
            </div>
            <div className="validation"></div>
          </Form.Group>
          <Form.Group className="row">
            <label htmlFor="description" className="col-form-label col-sm-3">Mô tả</label>
            <div className="col-sm-9">
              <textarea className="form-control" readOnly={modelOrgType === 3 || modelOrgType === 4} name="desc" value={product_group.desc} onChange={handleProductGroupChange} rows="4"></textarea>
            </div>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          {(modelOrgType === 1 || modelOrgType === 2) &&
            <button type="button" className="btn btn-primary btn-icon small_button" onClick={() => handleSaveProductGroup()}>Lưu</button>
          }
          {(modelOrgType === 4) &&
            <button type="button" className="btn btn-danger btn-icon small_button" onClick={() => handleSaveProductGroup()}>Xóa</button>
          }
          <button type="button" className="btn btn-secondary btn-icon small_button" onClick={() => { setShowProductGroupModel(false) }}>Đóng</button>
        </Modal.Footer>
      </Modal>
      {/* model product */}
      <Modal showOverlay={true} size={'lg'} show={showProductModel} onClose={() => { setShowProductModel(false) }}>
        <Modal.Header>
          <Modal.Title>
            {model_product_title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="row">
            <label htmlFor="code" className="col-form-label col-sm-2">Mã sản phẩm<span>*</span></label>
            <div className="col-sm-10">
              <Form.Control type="text" readOnly={[3, 4, 5].includes(modelEmpType)} name="code" value={product.code} onChange={handleProductChange} className="form-control" placeholder="" />
              {product_errors.code && <div className="validation">{product_errors.code}</div>}
            </div>
          </Form.Group>
          <Form.Group className="row">
            <label htmlFor="name" className="col-form-label col-sm-2">Tên sản phẩm<span>*</span></label>
            <div className="col-sm-10">
              <Form.Control type="text" readOnly={[3, 4, 5].includes(modelEmpType)} name="name" value={product.name} onChange={handleProductChange} className="form-control" placeholder="" />
              {product_errors.name && <div className="validation">{product_errors.name}</div>}
            </div>
          </Form.Group>
          <Form.Group className="row">
            <label htmlFor="manufactor" className="col-form-label col-sm-2">Nhà sản xuất</label>
            <div className="col-sm-4">
              <Form.Control type="text" readOnly={[3, 4, 5].includes(modelEmpType)} name="manufactor" value={product.manufactor} onChange={handleProductChange} className="form-control" placeholder="" />              
            </div>
            <label htmlFor="origin" className="col-form-label col-sm-2">Xuất xứ</label>
            <div className="col-sm-4">
              <Form.Control type="text" readOnly={[3, 4, 5].includes(modelEmpType)} name="origin" value={product.origin} onChange={handleProductChange} className="form-control" placeholder="" />              
            </div>
          </Form.Group>
          <Form.Group className="row">
          </Form.Group>
          <Form.Group className="row">
            <label htmlFor="description" className="col-form-label col-sm-2">Mô tả</label>
            <div className="col-sm-10">
              <textarea className="form-control" readOnly={[3, 4, 5].includes(modelEmpType)} name="description" value={product.description} onChange={handleProductChange} rows="4"></textarea>
            </div>
          </Form.Group>
          <Form.Group className="row">
            <label htmlFor="description" className="col-form-label col-sm-2">Trạng thái</label>
            <div className="col-sm-10">
              <div className="form-check">
                <label className="form-check-label text-muted">
                  <input type="checkbox" className="form-check-input" name='status' checked={product.status} onChange={handleStatusChange}/>
                  <i className="input-helper"></i>
                  Hoạt động
                </label>
              </div>
            </div>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          {([1, 2, 5].includes(modelEmpType)) &&
            <button type="button" className="btn btn-primary btn-icon small_button" onClick={() => handleSaveProduct()}>Lưu</button>
          }
          {(modelEmpType === 4) &&
            <button type="button" className="btn btn-danger btn-icon small_button" onClick={() => handleSaveProduct()}>Xóa</button>
          }
          <button type="button" className="btn btn-secondary btn-icon small_button" onClick={() => { setShowProductModel(false) }}>Đóng</button>
        </Modal.Footer>
      </Modal>
      {/* model alert */}
      <Alert message={alert_message} show={alert_show} onClose={() => setAlertShow(false)} />
    </div>
  )
}
export default ProductsList
