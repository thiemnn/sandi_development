import React, { useState, useEffect } from 'react'
import 'react-complex-tree/lib/style.css';
import { ControlledTreeEnvironment, Tree } from 'react-complex-tree';
import { Form } from 'react-bootstrap';
import Modal from '../components/Modal';
import Alert from '../components/Alert';
import Validator from '../../utils/validator';
import Common from '../../utils/common';
import { fetchWrapper } from '../../utils/fetch-wrapper';

function CommercialsList() {
  const root_id = 2;
  const category_type = 2;
  const [selected_product, setSelectedProduct] = useState(null);
  const [focusedItem, setFocusedItem] = useState();
  const [expandedItems, setExpandedItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
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
      message: 'Vui l??ng nh???p m?? nh??m.',
    },
    {
      field: 'name',
      method: 'isEmpty',
      validWhen: false,
      message: 'Vui l??ng nh???p t??n nh??m.',
    },
  ];
  const product_group_validator = new Validator(product_group_rules);

  const product_rules = [
    {
      field: 'code',
      method: 'isEmpty',
      validWhen: false,
      message: 'Vui l??ng nh???p m?? h??ng h??a.',
    },
    {
      field: 'name',
      method: 'isEmpty',
      validWhen: false,
      message: 'Vui l??ng nh???p h??? t??n.',
    }
  ];
  const product_validator = new Validator(product_rules);

  const product_insert_rules = [
    {
      field: 'code',
      method: 'isEmpty',
      validWhen: false,
      message: 'Vui l??ng nh???p m?? h??ng h??a.',
    },
    {
      field: 'name',
      method: 'isEmpty',
      validWhen: false,
      message: 'Vui l??ng nh???p h??? t??n.',
    }
  ];
  const product_insert_validator = new Validator(product_insert_rules);

  useEffect(() => {
    fetchProductGroup()
  }, [])

  function fetchProductGroup() {
    try {
      fetchWrapper.get(process.env.REACT_APP_API_URL + 'product_groups?type=' + category_type ).then((data) => {
        if (data.success) {
          console.log(data.data)
          setProductGroups(readProductGroup(data.data.product_groups))
          setProducts(data.data.products)
          setExpandedItems(data.data.ids)
          setSelectedProduct(null)
        }
      })
    } catch (error) {
      console.error(error);
    }
  }
  const readProductGroup = (template, data = { items: {} }) => {
    template.map((product_group, i) => {
      data.items[product_group.id.toString()] = {
        "index": product_group.id.toString(),
        "desc": product_group.description,
        "name": product_group.name,
        "code": product_group.code,
        "parent_id": product_group.parent_id,
        "canMove": true,
        "hasChildren": product_group.childs && product_group.childs.length > 0 ? true : false,
        "children": product_group.childs && product_group.childs.length > 0 ? product_group.childs : null,
        "data": product_group.name,
        "canRename": true,
      };
      return data;
    })
    return data.items;
  };

  function handleOpenProductModel(type) {
    setModelEmpType(type)
    setProductErrors({})
    if (type === 1) {
      if (selectedItems.length < 1) {
        setAlertMessage('Vui l??ng ch???n nh??m ????? th??m h??ng h??a')
        setAlertShow(true)
        return
      }
      const selectedProductGroup = product_groups[selectedItems[0]]
      if (selectedProductGroup.hasChildren) {
        setAlertMessage('Kh??ng ???????c th??m h??ng h??a cho nh??m cha')
        setAlertShow(true)
        return
      }      

      let current_id = selectedItems[0]
      let product_code = '';
      let product_name = '';
      if (current_id) {
        while (current_id !== root_id) {
          var group = product_groups[current_id]
          product_code = group.code + '-' + product_code
          product_name = group.name + ' ' + product_name
          current_id = group.parent_id
        }
        product_code = product_code + Common.ConvertToString(display_products.length + 1, 3)
        product_name = product_name + Common.ConvertToString(display_products.length + 1, 3)
      }

      setModelProductTitle('Th??m h??ng h??a')
      setProduct({ ...product, "code": product_code, "name": product_name, "description": '', "manufactor": '', "origin": '', "status": 1 });
      setShowProductModel(true)
    } else if (type === 2) {
      if (selectedItems.length < 1) {
        setAlertMessage('Vui l??ng ch???n nh??m h??ng h??a')
        setAlertShow(true)
        return
      }
      if (selected_product === null) {
        setAlertMessage('Vui l??ng ch???n h??ng h??a ????? s???a')
        setAlertShow(true)
        return
      }
      setModelProductTitle('S???a th??ng tin h??ng h??a')
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
      if (selectedItems.length < 1) {
        setAlertMessage('Vui l??ng ch???n nh??m h??ng h??a')
        setAlertShow(true)
        return
      }
      if (selected_product === null) {
        setAlertMessage('Vui l??ng ch???n h??ng h??a ????? xem')
        setAlertShow(true)
        return
      }
      setModelProductTitle('Xem th??ng tin h??ng h??a')
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
      if (selectedItems.length < 1) {
        setAlertMessage('Vui l??ng ch???n nh??m h??ng h??a')
        setAlertShow(true)
        return
      }
      if (selected_product === null) {
        setAlertMessage('Vui l??ng ch???n h??ng h??a ????? x??a')
        setAlertShow(true)
        return
      }
      setModelProductTitle('X??a th??ng tin h??ng h??a')
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
    if (selectedItems.length < 1) {
      setAlertMessage('Vui l??ng ch???n nh??m h??ng h??a')
      setAlertShow(true)
      return
    }
    const selected_id = parseInt(selectedItems[0])
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
            setAlertMessage('C?? l???i x???y ra trong qu?? tr??nh th???c hi???n')
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
            setAlertMessage('C?? l???i x???y ra trong qu?? tr??nh th???c hi???n')
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
            setAlertMessage('C?? l???i x???y ra trong qu?? tr??nh th???c hi???n')
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
      if (selectedItems.length < 1) {
        setAlertMessage('Vui l??ng ch???n nh??m cha ????? th??m nh??m h??ng h??a')
        setAlertShow(true)
        return
      }
      if (display_products && display_products.length > 0) {
        setAlertMessage('Kh??ng ???????c t???o nh??m con cho nh??m ???? c?? h??ng h??a')
        setAlertShow(true)
        return
      }
      setModelProductGroupTitle('Th??m nh??m h??ng h??a')
      setProductGroup({ ...product_group, "code": '', "name": '', "desc": '' });
      setShowProductGroupModel(true)
    } else if (type === 2) {
      if (selectedItems.length < 1) {
        setAlertMessage('Vui l??ng ch???n nh??m h??ng h??a ????? s???a')
        setAlertShow(true)
        return
      }
      const selectedProductGroup = product_groups[selectedItems[0]]
      setModelProductGroupTitle('S???a nh??m h??ng h??a')
      setProductGroup({ ...product_group, "code": selectedProductGroup.code, "name": selectedProductGroup.name, "desc": selectedProductGroup.desc });
      setShowProductGroupModel(true)
    } else if (type === 3) {
      if (selectedItems.length < 1) {
        setAlertMessage('Vui l??ng ch???n nh??m h??ng h??a ????? xem')
        setAlertShow(true)
        return
      }
      const selectedProductGroup = product_groups[selectedItems[0]]
      setModelProductGroupTitle('Xem nh??m h??ng h??a')
      setProductGroup({ ...product_group, "code": selectedProductGroup.code, "name": selectedProductGroup.name, "desc": selectedProductGroup.desc });
      setShowProductGroupModel(true)
    } else if (type === 4) {
      if (selectedItems.length < 1) {
        setAlertMessage('Vui l??ng ch???n nh??m h??ng h??a ????? x??a')
        setAlertShow(true)
        return
      }
      const selectedProductGroup = product_groups[selectedItems[0]]
      if (selectedProductGroup.hasChildren) {
        setAlertMessage('Kh??ng ???????c x??a nh??m h??ng h??a cha')
        setAlertShow(true)
        return
      }
      if(selectedProductGroup.parent_id === root_id){
        setAlertMessage('Kh??ng ???????c x??a nh??m h??ng h??a g???c')
        setAlertShow(true)
        return
      }
      if (display_products && display_products.length > 0) {
        setAlertMessage('Kh??ng ???????c x??a nh??m h??ng h??a c?? h??ng h??a')
        setAlertShow(true)
        return
      }
      setModelProductGroupTitle('X??a nh??m h??ng h??a')
      setProductGroup({ ...product_group, "code": selectedProductGroup.code, "name": selectedProductGroup.name, "desc": selectedProductGroup.desc });
      setShowProductGroupModel(true)
    }
  }

  function handleSaveProductGroup() {
    if (selectedItems.length < 1) {
      setAlertMessage('Vui l??ng ch???n nh??m h??ng h??a')
      setAlertShow(true)
      return
    }
    const current_errors = product_group_validator.validate(product_group)
    setProductGroupErrors(current_errors)
    if (!Common.isEmptyObject(current_errors)) {
      return
    }
    const selected_id = parseInt(selectedItems[0])
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
            setAlertMessage('C?? l???i x???y ra trong qu?? tr??nh th???c hi???n')
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
            setAlertMessage('C?? l???i x???y ra trong qu?? tr??nh th???c hi???n')
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
            setAlertMessage('C?? l???i x???y ra trong qu?? tr??nh th???c hi???n')
            setAlertShow(true)
          }
        })
      } catch (error) {
        console.error(error);
      }
    }
  }

  useEffect(() => {
    const selected_id = parseInt(selectedItems[0])
    console.log(selectedItems[0])
    console.log(product_groups)
    const temp_products = products.filter(
      (product) => product.group_id === selected_id
    );
    setDisplayProducts(temp_products)
    setSelectedProduct(null)    
  }, [products, selectedItems])

  return (
    <div>
      <div className="page-header">
        <h3 className="page-title"> Qu???n l?? danh m???c </h3>
      </div>
      <div className="row">
        <div className="col-lg-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div>
                <h4 className="card-title fl-left">Nh??m h??ng h??a</h4>
                <div className='fl-right mb-10'>
                  <button type="button" className="btn btn-primary btn-icon small_button" title="Th??m nh??m h??ng h??a" onClick={() => handleOpenProductGroupModel(1)}><i className="mdi mdi-plus-box"></i></button>
                  <button type="button" className="btn btn-success btn-icon small_button ml-10" title="S???a nh??m h??ng h??a" onClick={() => handleOpenProductGroupModel(2)}><i className="mdi mdi-pencil"></i></button>
                  <button type="button" className="btn btn-warning btn-icon small_button ml-10" title="Xem nh??m h??ng h??a" onClick={() => handleOpenProductGroupModel(3)}><i className="mdi mdi-eye"></i></button>
                  <button type="button" className="btn btn-danger btn-icon small_button ml-10" title="X??a nh??m h??ng h??a" onClick={() => handleOpenProductGroupModel(4)}><i className="mdi mdi-delete"></i></button>
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
                {
                  !Common.isEmptyObject(product_groups) &&
                  <ControlledTreeEnvironment
                    items={product_groups}
                    getItemTitle={item => item.data}
                    viewState={{
                      ['tree_product_groups']: {
                        focusedItem,
                        expandedItems,
                        selectedItems,
                      },
                    }}
                    defaultInteractionMode={'click-arrow-to-expand'}
                    onFocusItem={item => setFocusedItem(item.index)}
                    onExpandItem={item => setExpandedItems([...expandedItems, item.index])}
                    onCollapseItem={item =>
                      setExpandedItems(expandedItems.filter(expandedItemIndex => expandedItemIndex !== item.index))
                    }
                    onSelectItems={items => setSelectedItems(items)}
                  >
                    <Tree treeId="tree_product_groups" rootItem={root_id} treeLabel="Danh m???c h??ng h??a" />
                  </ControlledTreeEnvironment>
                }

              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div>
                <h4 className="card-title fl-left">Danh m???c h??ng h??a</h4>
                <div className='fl-right mb-10'>
                  <button type="button" className="btn btn-primary btn-icon small_button" title="Th??m h??ng h??a" onClick={() => handleOpenProductModel(1)}><i className="mdi mdi-plus-box"></i> </button>
                  <button type="button" className="btn btn-success btn-icon small_button ml-10" title="S???a h??ng h??a" onClick={() => handleOpenProductModel(2)}><i className="mdi mdi-pencil"></i> </button>
                  <button type="button" className="btn btn-warning btn-icon small_button ml-10" title="Xem h??ng h??a" onClick={() => handleOpenProductModel(3)}><i className="mdi mdi-eye"></i> </button>
                  <button type="button" className="btn btn-danger btn-icon small_button ml-10" title="X??a h??ng h??a" onClick={() => handleOpenProductModel(4)}><i className="mdi mdi-delete"></i> </button>
                </div>
                <div className='clear-both'></div>
              </div>
              <div className='table-wrapper'>
                <div className="table-responsive">
                  <table className="table table-hover products">
                    <thead>
                      <tr>
                        <th className='td_wrapper_300' style={{ width: '60px' }}>M?? h??ng h??a</th>
                        <th className='td_wrapper_300' style={{ width: '200px' }}>T??n h??ng h??a</th>
                        <th style={{ width: '200px' }}>M?? t???</th>
                        <th style={{ width: '60px' }}>Tr???ng th??i</th>
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
                              {product.status === 1 && <label className="badge badge-success">Ho???t ?????ng</label>}
                              {product.status === 0 && <label className="badge badge-warning">T???m d???ng</label>}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  {(!display_products || display_products.length === 0) && (
                    <div className='center'>Kh??ng c?? b???n ghi n??o</div>
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
            <label htmlFor="code" className="col-form-label col-sm-3">M?? nh??m<span>*</span></label>
            <div className="col-sm-9">
              <Form.Control type="text" required readOnly={modelOrgType === 3 || modelOrgType === 4} name="code" value={product_group.code} onChange={handleProductGroupChange} className="form-control" placeholder="" />
              {product_group_errors.code && <div className="validation">{product_group_errors.code}</div>}
            </div>
            <div className="validation"></div>
          </Form.Group>
          <Form.Group className="row">
            <label htmlFor="name" className="col-form-label col-sm-3">T??n nh??m<span>*</span></label>
            <div className="col-sm-9">
              <Form.Control type="text" required readOnly={modelOrgType === 3 || modelOrgType === 4} name="name" value={product_group.name} onChange={handleProductGroupChange} className="form-control" placeholder="" />
              {product_group_errors.name && <div className="validation">{product_group_errors.name}</div>}
            </div>
            <div className="validation"></div>
          </Form.Group>
          <Form.Group className="row">
            <label htmlFor="description" className="col-form-label col-sm-3">M?? t???</label>
            <div className="col-sm-9">
              <textarea className="form-control" readOnly={modelOrgType === 3 || modelOrgType === 4} name="desc" value={product_group.desc} onChange={handleProductGroupChange} rows="4"></textarea>
            </div>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          {(modelOrgType === 1 || modelOrgType === 2) &&
            <button type="button" className="btn btn-primary btn-icon small_button" onClick={() => handleSaveProductGroup()}>L??u</button>
          }
          {(modelOrgType === 4) &&
            <button type="button" className="btn btn-danger btn-icon small_button" onClick={() => handleSaveProductGroup()}>X??a</button>
          }
          <button type="button" className="btn btn-secondary btn-icon small_button" onClick={() => { setShowProductGroupModel(false) }}>????ng</button>
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
            <label htmlFor="code" className="col-form-label col-sm-2">M?? h??ng h??a<span>*</span></label>
            <div className="col-sm-10">
              <Form.Control type="text" readOnly={[3, 4, 5].includes(modelEmpType)} name="code" value={product.code} onChange={handleProductChange} className="form-control" placeholder="" />
              {product_errors.code && <div className="validation">{product_errors.code}</div>}
            </div>
          </Form.Group>
          <Form.Group className="row">
            <label htmlFor="name" className="col-form-label col-sm-2">T??n h??ng h??a<span>*</span></label>
            <div className="col-sm-10">
              <Form.Control type="text" readOnly={[3, 4, 5].includes(modelEmpType)} name="name" value={product.name} onChange={handleProductChange} className="form-control" placeholder="" />
              {product_errors.name && <div className="validation">{product_errors.name}</div>}
            </div>
          </Form.Group>
          <Form.Group className="row">
            <label htmlFor="manufactor" className="col-form-label col-sm-2">Nh?? s???n xu???t</label>
            <div className="col-sm-4">
              <Form.Control type="text" readOnly={[3, 4, 5].includes(modelEmpType)} name="manufactor" value={product.manufactor} onChange={handleProductChange} className="form-control" placeholder="" />              
            </div>
            <label htmlFor="origin" className="col-form-label col-sm-2">Xu???t x???</label>
            <div className="col-sm-4">
              <Form.Control type="text" readOnly={[3, 4, 5].includes(modelEmpType)} name="origin" value={product.origin} onChange={handleProductChange} className="form-control" placeholder="" />              
            </div>
          </Form.Group>
          <Form.Group className="row">
          </Form.Group>
          <Form.Group className="row">
            <label htmlFor="description" className="col-form-label col-sm-2">M?? t???</label>
            <div className="col-sm-10">
              <textarea className="form-control" readOnly={[3, 4, 5].includes(modelEmpType)} name="description" value={product.description} onChange={handleProductChange} rows="4"></textarea>
            </div>
          </Form.Group>
          <Form.Group className="row">
            <label htmlFor="description" className="col-form-label col-sm-2">Tr???ng th??i</label>
            <div className="col-sm-10">
              <div className="form-check">
                <label className="form-check-label text-muted">
                  <input type="checkbox" className="form-check-input" name='status' checked={product.status} onChange={handleStatusChange}/>
                  <i className="input-helper"></i>
                  Ho???t ?????ng
                </label>
              </div>
            </div>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          {([1, 2, 5].includes(modelEmpType)) &&
            <button type="button" className="btn btn-primary btn-icon small_button" onClick={() => handleSaveProduct()}>L??u</button>
          }
          {(modelEmpType === 4) &&
            <button type="button" className="btn btn-danger btn-icon small_button" onClick={() => handleSaveProduct()}>X??a</button>
          }
          <button type="button" className="btn btn-secondary btn-icon small_button" onClick={() => { setShowProductModel(false) }}>????ng</button>
        </Modal.Footer>
      </Modal>
      {/* model alert */}
      <Alert message={alert_message} show={alert_show} onClose={() => setAlertShow(false)} />
    </div>
  )
}
export default CommercialsList
