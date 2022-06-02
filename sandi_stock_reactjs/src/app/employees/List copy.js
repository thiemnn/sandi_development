import React, { useState, useEffect } from 'react'
import 'react-complex-tree/lib/style.css';
import { ControlledTreeEnvironment, Tree } from 'react-complex-tree';
import { Form } from 'react-bootstrap';
import Modal from '../components/Modal';
import Alert from '../components/Alert';
import Validator from '../../utils/validator';

function List() {
  const [selected_employee, setSelectedEmployee] = useState(null);
  const [focusedItem, setFocusedItem] = useState();
  const [expandedItems, setExpandedItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [organizations, setOrganizations] = useState();
  const [employees, setEmployees] = useState([]);
  const [display_employees, setDisplayEmployees] = useState([]);

  //model organization
  const [model_organization_title, setModelOrganizationTitle] = useState();
  const [showOrganizationModel, setShowOrganizationModel] = useState(false);
  const [organization_code, setOrganizationCode] = useState('');
  const [organization_name, setOrganizationName] = useState('');
  const [organization_desc, setOrganizationDesc] = useState('');
  const [modelOrgType, setModelOrgType] = useState(0);
  //model employee
  const [model_employee_title, setModelEmployeeTitle] = useState();
  const [showEmployeeModel, setShowEmployeeModel] = useState(false);
  const [employee_id, setEmployeeId] = useState(0);
  const [employee_code, setEmployeeCode] = useState('');
  const [employee_full_name, setEmployeeFullName] = useState('');
  const [employee_account, setEmployeeAccount] = useState('');
  const [employee_password, setEmployeePassword] = useState('');
  const [employee_confirm, setEmployeeConfirm] = useState('');

  const [modelEmpType, setModelEmpType] = useState(0);
  //alert message
  const [alert_message, setAlertMessage] = useState('');
  const [alert_show, setAlertShow] = useState(false);
  const [errros, setErrors] = useState({});
  
  const rules = [
    {
      field: 'employee_code',
      method: 'isEmpty',
      validWhen: false,
      message: 'The employee_code field is required.',
    },
    {
      field: 'employee_full_name',
      method: 'isEmpty',
      validWhen: false,
      message: 'The employee_full_name field is required.',
    },
    {
      field: 'employee_account',
      method: 'isEmpty',
      validWhen: false,
      message: 'The employee_account field is required.',
    },
  ];
  const validator = new Validator(rules);

  useEffect(() => {
    fetchOrganization()
  }, [])

  function fetchOrganization() {
    try {
      fetch(process.env.REACT_APP_API_URL + "organizations")
        .then((res) => res.json())
        .then((data) => {
          setOrganizations(readOrganization(data.data.organizations))
          setEmployees(data.data.employees)
          setExpandedItems(data.data.ids)
          setSelectedEmployee(null)
          console.log(data.data)
        })
    } catch (error) {
      console.error(error);
    }
  }
  const readOrganization = (template, data = { items: {} }) => {
    template.map((organization, i) => {
      data.items[organization.id.toString()] = {
        "index": organization.id.toString(),
        "desc": organization.description,
        "name": organization.name,
        "code": organization.code,
        "canMove": true,
        "hasChildren": organization.childs && organization.childs.length > 0 ? true : false,
        "children": organization.childs && organization.childs.length > 0 ? organization.childs : null,
        "data": organization.name,
        "canRename": true,
      };
      return data;
    })
    return data.items;
  };

  function handleOpenEmployeeModel(type){
    setModelEmpType(type)
    if(type === 1){
      if (selectedItems.length < 1) {
        setAlertMessage('Vui lòng chọn đơn vị tổ chức để thêm nhân viên')
        setAlertShow(true)
        return
      }
      setModelEmployeeTitle('Thêm nhân viên')
      setEmployeeCode('')
      setEmployeeFullName('')
      setEmployeeAccount('')
      setEmployeePassword('')
      setEmployeeConfirm('')
      setShowEmployeeModel(true)
    } else if(type === 2){
      if (selectedItems.length < 1) {
        setAlertMessage('Vui lòng chọn đơn vị tổ chức')
        setAlertShow(true)
        return
      }
      if( selected_employee === null){
        setAlertMessage('Vui lòng chọn nhân viên để sửa')
        setAlertShow(true)
        return
      }
      setModelEmployeeTitle('Sửa thông tin nhân viên')
      setEmployeeId(selected_employee.id)
      setEmployeeCode(selected_employee.code)
      setEmployeeFullName(selected_employee.full_name)
      setEmployeeAccount(selected_employee.account)
      setShowEmployeeModel(true)
    } else if(type === 3){
      if (selectedItems.length < 1) {
        setAlertMessage('Vui lòng chọn đơn vị tổ chức')
        setAlertShow(true)
        return
      }
      if( selected_employee === null){
        setAlertMessage('Vui lòng chọn nhân viên để xem')
        setAlertShow(true)
        return
      }
      setModelEmployeeTitle('Xem thông tin nhân viên')
      setEmployeeId(selected_employee.id)
      setEmployeeCode(selected_employee.code)
      setEmployeeFullName(selected_employee.full_name)
      setEmployeeAccount(selected_employee.account)
      setShowEmployeeModel(true)
    } else if(type === 5){
      if (selectedItems.length < 1) {
        setAlertMessage('Vui lòng chọn đơn vị tổ chức')
        setAlertShow(true)
        return
      }
      if( selected_employee === null){
        setAlertMessage('Vui lòng chọn nhân viên để đặt lại mật khẩu')
        setAlertShow(true)
        return
      }
      setModelEmployeeTitle('Đặt lại mật khẩu nhân viên')
      setEmployeeId(selected_employee.id)
      setEmployeeCode(selected_employee.code)
      setEmployeeFullName(selected_employee.full_name)
      setEmployeeAccount(selected_employee.account)
      setShowEmployeeModel(true)
    }
  }

  function handleSaveEmployee(){
    if (selectedItems.length < 1) {
      setAlertMessage('Vui lòng chọn đơn vị tổ chức')
      setAlertShow(true)
      return
    }
    setErrors(validator.validate())
    const selected_id = parseInt(selectedItems[0])
    if(modelEmpType === 1){
      const body = {
        code: employee_code,
        full_name: employee_full_name,
        account: employee_account,
        organization_id: selected_id,
        password: employee_password
      }
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      };
      try {
        fetch(process.env.REACT_APP_API_URL + "employees/insert", requestOptions)
          .then((res) => res.json())
          .then((data) => {            
            setShowEmployeeModel(false)
            if(data.success){
              console.log(data)
              setSelectedEmployee(null)
              fetchOrganization()
            } else {
              setAlertMessage('Có lỗi xảy ra trong quá trình thực hiện')
              setAlertShow(true)
            }
          })
      } catch (error) {
        console.error(error);
      }
    } else if(modelEmpType === 2){
      const body = {
        code: employee_code,
        full_name: employee_full_name,
        account: employee_account,
        organization_id: selected_id
      }
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      };
      try {
        fetch(process.env.REACT_APP_API_URL + 'employees/' + employee_id + '/update', requestOptions)
          .then((res) => res.json())
          .then((data) => {            
            setShowEmployeeModel(false)
            if(data.success){
              console.log(data)
              setSelectedEmployee(null)
              fetchOrganization()
            } else{
              setAlertMessage('Có lỗi xảy ra trong quá trình thực hiện')
              setAlertShow(true)
            }
          })
      } catch (error) {
        console.error(error);
      }
    }
  }  

  function handleOpenOrganizationModel(type) {    
    setModelOrgType(type)
    if(type === 1){
      if (selectedItems.length < 1) {
        setAlertMessage('Vui lòng chọn đơn vị tổ chức cha để thêm tổ chức')
        setAlertShow(true)
        return
      }
      setModelOrganizationTitle('Thêm tổ chức')
      setOrganizationCode('')
      setOrganizationName('')
      setOrganizationDesc('')
      setShowOrganizationModel(true)
    } else if(type === 2){
      if (selectedItems.length < 1) {
        setAlertMessage('Vui lòng chọn đơn vị tổ chức để sửa')
        setAlertShow(true)
        return
      }
      const selectedEmployee = organizations[selectedItems[0]]
      setModelOrganizationTitle('Sửa tổ chức')
      setOrganizationCode(selectedEmployee.code)
      setOrganizationName(selectedEmployee.name)
      setOrganizationDesc(selectedEmployee.desc)
      setShowOrganizationModel(true)
    } else if(type === 3){
      if (selectedItems.length < 1) {
        setAlertMessage('Vui lòng chọn đơn vị tổ chức để xem')
        setAlertShow(true)
        return
      }
      const selectedEmployee = organizations[selectedItems[0]]
      setModelOrganizationTitle('Xem tổ chức')      
      setOrganizationCode(selectedEmployee.code)
      setOrganizationName(selectedEmployee.name)
      setOrganizationDesc(selectedEmployee.desc)
      setShowOrganizationModel(true)
    } else if(type === 4){
      if (selectedItems.length < 1) {
        setAlertMessage('Vui lòng chọn đơn vị tổ chức để xóa')
        setAlertShow(true)
        return
      }
      const selectedEmployee = organizations[selectedItems[0]]
      setModelOrganizationTitle('Xóa tổ chức')      
      setOrganizationCode(selectedEmployee.code)
      setOrganizationName(selectedEmployee.name)
      setOrganizationDesc(selectedEmployee.desc)
      setShowOrganizationModel(true)
    } else if(type === 5){
      if (selectedItems.length < 1) {
        setAlertMessage('Vui lòng chọn đơn vị tổ chức để phân quyền')
        setAlertShow(true)
        return
      }
    }   
  }

  function handleSaveOrganization(){
    if (selectedItems.length < 1) {
      setAlertMessage('Vui lòng chọn đơn vị tổ chức')
      setAlertShow(true)
      return
    }
    const selected_id = parseInt(selectedItems[0])
    if(modelOrgType === 1){
      const body = {
        code: organization_code,
        name: organization_name,
        description: organization_desc,
        parent_id: selected_id
      }
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      };
      try {
        fetch(process.env.REACT_APP_API_URL + "organizations/insert", requestOptions)
          .then((res) => res.json())
          .then((data) => {
            console.log(data)
            fetchOrganization()
            setShowOrganizationModel(false)
          })
      } catch (error) {
        console.error(error);
      }
    } else if(modelOrgType === 2){
      const body = {
        code: organization_code,
        name: organization_name,
        description: organization_desc
      }
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      };
      try {
        fetch(process.env.REACT_APP_API_URL + 'organizations/' + selected_id + '/update', requestOptions)
          .then((res) => res.json())
          .then((data) => {
            console.log(data)
            fetchOrganization()
            setShowOrganizationModel(false)
          })
      } catch (error) {
        console.error(error);
      }
    } else if (modelOrgType === 4) {
      const requestOptions = {
        method: 'DELETE'
      };
      try {
        fetch(process.env.REACT_APP_API_URL + 'organizations/' + selected_id + '/delete', requestOptions)
          .then((res) => res.json())
          .then((data) => {
            setShowOrganizationModel(false)
            if (data.success) {              
              console.log(data)
              fetchOrganization()              
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
    const selected_id = parseInt(selectedItems[0])
    const temp_employees = employees.filter(
      (employee) => employee.organization_id === selected_id
    );
    setDisplayEmployees(temp_employees)
    setSelectedEmployee(null)
    // console.log(temp_employees)
  }, [employees, selectedItems])   

  return (
    <div>
      <div className="page-header">
        <h3 className="page-title"> Quản lý nhân viên </h3>
      </div>
      <div className="row">
        <div className="col-lg-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <div>
                <h4 className="card-title fl-left">Cơ cấu tổ chức</h4>
                <div className='fl-right mb-10'>
                  <button type="button" className="btn btn-primary btn-icon small_button" title="Thêm tổ chức" onClick={() => handleOpenOrganizationModel(1)}><i className="mdi mdi-plus-box"></i></button>
                  <button type="button" className="btn btn-success btn-icon small_button ml-10" title="Sửa tổ chức" onClick={() => handleOpenOrganizationModel(2)}><i className="mdi mdi-pencil"></i></button>
                  <button type="button" className="btn btn-warning btn-icon small_button ml-10" title="Xem tổ chức" onClick={() => handleOpenOrganizationModel(3)}><i className="mdi mdi-eye"></i></button>
                  {/* <button type="button" className="btn btn-danger btn-icon small_button ml-10" title="Xóa tổ chức" onClick={() => handleOpenOrganizationModel(4)}><i className="mdi mdi-delete"></i></button> */}
                  <button type="button" className="btn btn-primary btn-icon small_button ml-10" title="Phân quyền tổ chức" onClick={() => handleOpenOrganizationModel(5)}><i className="mdi mdi-settings"></i></button>
                </div>
                <div className='clear-both'></div>
              </div>
              <div className='tree-wrapper'>
                <style>{`
                  :root {        
                    --rct-item-height: 32px;
                  }
                  .rct-tree-item-li {
                    font-size: 1.2rem;
                  }
                `}</style>
                {
                  organizations && Object.keys(organizations).length > 0 &&
                  <ControlledTreeEnvironment
                    items={organizations}
                    getItemTitle={item => item.data}
                    viewState={{
                      ['tree_organizations']: {
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
                    <Tree treeId="tree_organizations" rootItem="12" treeLabel="Cơ cấu tổ chức" />
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
                <h4 className="card-title fl-left">Danh sách nhân viên</h4>
                <div className='fl-right mb-10'>
                  <button type="button" className="btn btn-primary btn-icon small_button" title="Thêm nhân viên" onClick={() => handleOpenEmployeeModel(1)}><i className="mdi mdi-plus-box"></i> </button>
                  <button type="button" className="btn btn-success btn-icon small_button ml-10" title="Sửa nhân viên" onClick={() => handleOpenEmployeeModel(2)}><i className="mdi mdi-pencil"></i> </button>
                  <button type="button" className="btn btn-warning btn-icon small_button ml-10" title="Xem nhân viên" onClick={() => handleOpenEmployeeModel(3)}><i className="mdi mdi-eye"></i> </button>
                  {/* <button type="button" className="btn btn-danger btn-icon small_button ml-10" title="Xóa nhân viên" onClick={() => handleOpenEmployeeModel(4)}><i className="mdi mdi-delete"></i> </button> */}
                  <button type="button" className="btn btn-primary btn-icon small_button ml-10" title="Đổi mật khẩu" onClick={() => handleOpenEmployeeModel(5)}><i className="mdi mdi-account-key"></i> </button>
                </div>
                <div className='clear-both'></div>
              </div>
              <div className='table-wrapper'>
                <div className="table-responsive">
                  <table className="table table-hover employees">
                    <thead>
                      <tr>
                        <th style={{ width: '60px' }}>Mã nhân viên</th>
                        <th style={{ width: '200px' }}>Họ và tên</th>
                        <th style={{ width: '200px' }}>Tài khoản</th>
                        <th style={{ width: '60px' }}>Trạng thái</th>
                      </tr>
                    </thead>
                    <tbody>
                      {display_employees && display_employees.map(function (employee, index) {
                        return (
                          <tr key={"employee-" + index} className={selected_employee && selected_employee.id === employee.id ? 'selected-row' : ''} onClick={() => setSelectedEmployee(employee)}>
                            <td>{employee.code}</td>
                            <td>{employee.full_name}</td>
                            <td>{employee.account}</td>
                            <td>
                              {employee.id > 5 && <label className="badge badge-success">Hoạt động</label>}
                              {employee.id <= 5 && <label className="badge badge-warning">Tạm dừng</label>}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  {(!display_employees || display_employees.length === 0) && (
                    <div className='center'>Không có bản ghi nào</div>
                  )}
                </div>
              </div>
            </div>              
          </div>
        </div>
      </div>
      {/* model organization */}
      <Modal showOverlay={true} size={'md'} show={showOrganizationModel} onClose={() => {setShowOrganizationModel(false)}}>
        <Modal.Header>
          <Modal.Title>
          {model_organization_title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="row">
            <label htmlFor="code" className="col-form-label col-sm-3">Mã tổ chức<span>*</span></label>
            <div className="col-sm-9">
              <Form.Control type="text" required readOnly={modelOrgType === 3 || modelOrgType === 4} value={organization_code} onChange={e => setOrganizationCode(e.target.value)} className="form-control" placeholder="" />
            </div>
            <div className="validation"></div>            
          </Form.Group>
          <Form.Group className="row">
            <label htmlFor="name" className="col-form-label col-sm-3">Tên tổ chức<span>*</span></label>
            <div className="col-sm-9">
              <Form.Control type="text" required readOnly={modelOrgType === 3 || modelOrgType === 4} value={organization_name} onChange={e => setOrganizationName(e.target.value)} className="form-control" placeholder="" />
            </div>
            <div className="validation"></div>
          </Form.Group>
          <Form.Group className="row">
            <label htmlFor="description" className="col-form-label col-sm-3">Mô tả</label>
            <div className="col-sm-9">
            <textarea className="form-control" readOnly={modelOrgType === 3 || modelOrgType === 4} value={organization_desc} onChange={e => setOrganizationDesc(e.target.value)} rows="4"></textarea>
            </div>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          {(modelOrgType === 1 || modelOrgType === 2) &&
            <button type="button" className="btn btn-primary btn-icon small_button" onClick={() => handleSaveOrganization()}>Lưu</button>
          }
          {(modelOrgType === 4) &&
            <button type="button" className="btn btn-danger btn-icon small_button" onClick={() => handleSaveOrganization()}>Xóa</button>
          }
          <button type="button" className="btn btn-secondary btn-icon small_button" onClick={() => {setShowOrganizationModel(false)}}>Đóng</button>
        </Modal.Footer>
      </Modal>
      {/* model employee */}
      <Modal showOverlay={true} size={'md'} show={showEmployeeModel} onClose={() => {setShowEmployeeModel(false)}}>
        <Modal.Header>
          <Modal.Title>
          {model_employee_title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="row">
            <label htmlFor="employee_code" className="col-form-label col-sm-3">Mã nhân viên<span>*</span></label>
            <div className="col-sm-9">
            <Form.Control type="text" readOnly={[3,4,5].includes(modelEmpType)} name="employee_code" value={employee_code} onChange={e => setEmployeeCode(e.target.value)} className="form-control" placeholder="" />
            </div>
          </Form.Group>
          <Form.Group className="row">
            <label htmlFor="employee_full_name" className="col-form-label col-sm-3">Họ và tên<span>*</span></label>
            <div className="col-sm-9">
            <Form.Control type="text" readOnly={[3,4,5].includes(modelEmpType)} name="employee_full_name" value={employee_full_name} onChange={e => setEmployeeFullName(e.target.value)} className="form-control" placeholder="" />
            </div>
          </Form.Group>
          <Form.Group className="row">
            <label htmlFor="employee_account" className="col-form-label col-sm-3">Tài khoản<span>*</span></label>
            <div className="col-sm-9">
            <Form.Control type="text" readOnly={[3,4,5].includes(modelEmpType)} name="employee_account" value={employee_account} onChange={e => setEmployeeAccount(e.target.value)} className="form-control" placeholder="" />
            </div>
          </Form.Group>
          {(modelEmpType === 1 || modelEmpType === 5) &&
            <Form.Group className="row">
              <label htmlFor="address" className="col-form-label col-sm-3">Mật khẩu</label>
              <div className="col-sm-9">
                <Form.Control type="password" value={employee_password} onChange={e => setEmployeePassword(e.target.value)} className="form-control" placeholder="" />
              </div>
            </Form.Group>
          }
          {(modelEmpType === 1 || modelEmpType === 5) &&
            <Form.Group className="row">
              <label htmlFor="address" className="col-form-label col-sm-3">Nhập lại mật khẩu</label>
              <div className="col-sm-9">
                <Form.Control type="password"  value={employee_confirm} onChange={e => setEmployeeConfirm(e.target.value)} className="form-control" placeholder="" />
              </div>
            </Form.Group>
          }          
        </Modal.Body>
        <Modal.Footer>
          {(modelEmpType === 1 || modelEmpType === 2) &&
            <button type="button" className="btn btn-primary btn-icon small_button" onClick={() => handleSaveEmployee()}>Lưu</button>
          }
          {(modelEmpType === 4) &&
            <button type="button" className="btn btn-danger btn-icon small_button" onClick={() => handleSaveEmployee()}>Xóa</button>
          }
          <button type="button" className="btn btn-secondary btn-icon small_button" onClick={() => {setShowEmployeeModel(false)}}>Đóng</button>
        </Modal.Footer>
      </Modal>
      {/* model alert */}
      <Alert message={alert_message} show={alert_show} onClose={() => setAlertShow(false)}/>
    </div>
  )
}
export default List