import React, { useState, useEffect } from 'react'
import 'react-complex-tree/lib/style.css';
import { ControlledTreeEnvironment, Tree } from 'react-complex-tree';
import { Form } from 'react-bootstrap';
import Modal from '../components/Modal';
import Alert from '../components/Alert';
import Validator from '../../utils/validator';
import Common from '../../utils/common';
import { fetchWrapper } from '../../utils/fetch-wrapper';

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
  const [organization_errors, setOrganizationErrors] = useState({});
  const [organization, setOrganization] = useState({ id: 0, code: "", name: "", desc: "" });
  const handleOrganizationChange = (event) => {
    event.persist();
    setOrganization({ ...organization, [event.target.name]: event.target.value });
  };
  const [modelOrgType, setModelOrgType] = useState(0);

  //model employee
  const [model_employee_title, setModelEmployeeTitle] = useState();
  const [showEmployeeModel, setShowEmployeeModel] = useState(false);
  const [employee_errors, setEmployeeErrors] = useState({});
  const [employee, setEmployee] = useState({ id: 0, code: "", full_name: "", account: "", password: "", confirm: "" });
  const handleEmployeeChange = (event) => {
    event.persist();
    setEmployee({ ...employee, [event.target.name]: event.target.value });
  };
  const [modelEmpType, setModelEmpType] = useState(0);

  //alert message
  const [alert_message, setAlertMessage] = useState('');
  const [alert_show, setAlertShow] = useState(false);

  const organization_rules = [
    {
      field: 'code',
      method: 'isEmpty',
      validWhen: false,
      message: 'Vui lòng nhập mã tổ chức.',
    },
    {
      field: 'name',
      method: 'isEmpty',
      validWhen: false,
      message: 'Vui lòng nhập tên tổ chức.',
    },
  ];
  const organization_validator = new Validator(organization_rules);

  const employee_rules = [
    {
      field: 'code',
      method: 'isEmpty',
      validWhen: false,
      message: 'Vui lòng nhập mã nhân viên.',
    },
    {
      field: 'full_name',
      method: 'isEmpty',
      validWhen: false,
      message: 'Vui lòng nhập họ tên.',
    },
    {
      field: 'account',
      method: 'isEmpty',
      validWhen: false,
      message: 'Vui lòng nhập email đăng nhập.',
    },
  ];
  const employee_validator = new Validator(employee_rules);

  const employee_insert_rules = [
    {
      field: 'code',
      method: 'isEmpty',
      validWhen: false,
      message: 'Vui lòng nhập mã nhân viên.',
    },
    {
      field: 'full_name',
      method: 'isEmpty',
      validWhen: false,
      message: 'Vui lòng nhập họ tên.',
    },
    {
      field: 'account',
      method: 'isEmpty',
      validWhen: false,
      message: 'Vui lòng nhập email đăng nhập.',
    },
    {
      field: 'password',
      method: 'isEmpty',
      validWhen: false,
      message: 'Vui lòng nhập mật khẩu.',
    },
    {
      field: 'confirm',
      method: 'isEmpty',
      validWhen: false,
      message: 'Vui lòng nhập xác nhận mật khẩu.',
    },
  ];
  const employee_insert_validator = new Validator(employee_insert_rules);

  useEffect(() => {
    fetchOrganization()
  }, [])

  function fetchOrganization() {
    try {
      fetchWrapper.get(process.env.REACT_APP_API_URL + 'organizations').then((data) => {
        if (data.success) {
          setOrganizations(readOrganization(data.data.organizations))
          setEmployees(data.data.employees)
          setExpandedItems(data.data.ids)
          setSelectedEmployee(null)
        }
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

  function handleOpenEmployeeModel(type) {
    setModelEmpType(type)
    setEmployeeErrors({})
    if (type === 1) {
      if (selectedItems.length < 1) {
        setAlertMessage('Vui lòng chọn đơn vị tổ chức để thêm nhân viên')
        setAlertShow(true)
        return
      }
      const selectedOrganization = organizations[selectedItems[0]]
      if (selectedOrganization.hasChildren) {
        setAlertMessage('Không được thêm nhân viên cho tổ chức cha')
        setAlertShow(true)
        return
      }
      setModelEmployeeTitle('Thêm nhân viên')
      setEmployee({ ...employee, "code": '', "full_name": '', "account": '', "password": '', "confirm": '' });
      setShowEmployeeModel(true)
    } else if (type === 2) {
      if (selectedItems.length < 1) {
        setAlertMessage('Vui lòng chọn đơn vị tổ chức')
        setAlertShow(true)
        return
      }
      if (selected_employee === null) {
        setAlertMessage('Vui lòng chọn nhân viên để sửa')
        setAlertShow(true)
        return
      }
      setModelEmployeeTitle('Sửa thông tin nhân viên')
      setEmployee({ ...employee, "id": selected_employee.id, "code": selected_employee.code, "full_name": selected_employee.full_name, "account": selected_employee.account });
      setShowEmployeeModel(true)
    } else if (type === 3) {
      if (selectedItems.length < 1) {
        setAlertMessage('Vui lòng chọn đơn vị tổ chức')
        setAlertShow(true)
        return
      }
      if (selected_employee === null) {
        setAlertMessage('Vui lòng chọn nhân viên để xem')
        setAlertShow(true)
        return
      }
      setModelEmployeeTitle('Xem thông tin nhân viên')
      setEmployee({ ...employee, "id": selected_employee.id, "code": selected_employee.code, "full_name": selected_employee.full_name, "account": selected_employee.account });
      setShowEmployeeModel(true)
    } else if (type === 4) {
      if (selectedItems.length < 1) {
        setAlertMessage('Vui lòng chọn đơn vị tổ chức')
        setAlertShow(true)
        return
      }
      if (selected_employee === null) {
        setAlertMessage('Vui lòng chọn nhân viên để xóa')
        setAlertShow(true)
        return
      }
      setModelEmployeeTitle('Xóa thông tin nhân viên')
      setEmployee({ ...employee, "id": selected_employee.id, "code": selected_employee.code, "full_name": selected_employee.full_name, "account": selected_employee.account });
      setShowEmployeeModel(true)
    } else if (type === 5) {
      if (selectedItems.length < 1) {
        setAlertMessage('Vui lòng chọn đơn vị tổ chức')
        setAlertShow(true)
        return
      }
      if (selected_employee === null) {
        setAlertMessage('Vui lòng chọn nhân viên để đặt lại mật khẩu')
        setAlertShow(true)
        return
      }
      setModelEmployeeTitle('Đặt lại mật khẩu nhân viên')
      setEmployee({ ...employee, "id": selected_employee.id, "code": selected_employee.code, "full_name": selected_employee.full_name, "account": selected_employee.account });
      setShowEmployeeModel(true)
    }
  }

  function handleSaveEmployee() {
    if (selectedItems.length < 1) {
      setAlertMessage('Vui lòng chọn đơn vị tổ chức')
      setAlertShow(true)
      return
    }
    const selected_id = parseInt(selectedItems[0])
    if (modelEmpType === 1) {
      const current_errors = employee_insert_validator.validate(employee)
      setEmployeeErrors(current_errors)
      if (!Common.isEmptyObject(current_errors)) {
        return
      }
      const body = {
        code: employee.code,
        full_name: employee.full_name,
        account: employee.account,
        organization_id: selected_id,
        password: employee.password
      }
      try {
        fetchWrapper.post(process.env.REACT_APP_API_URL + 'employees/insert', body).then((data) => {
          setShowEmployeeModel(false)
          if (data.success) {
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
    } else if (modelEmpType === 2) {
      const current_errors = employee_validator.validate(employee)
      setEmployeeErrors(current_errors)
      if (!Common.isEmptyObject(current_errors)) {
        return
      }
      const body = {
        code: employee.code,
        full_name: employee.full_name,
        account: employee.account,
        organization_id: selected_id
      }
      try {
        fetchWrapper.put(process.env.REACT_APP_API_URL + 'employees/' + employee.id + '/update', body).then((data) => {
          setShowEmployeeModel(false)
          if (data.success) {
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
    } else if (modelEmpType === 4) {
      try {
        fetchWrapper.delete(process.env.REACT_APP_API_URL + 'employees/' + employee.id + '/delete').then((data) => {
          setShowEmployeeModel(false)
          if (data.success) {
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
    } else if (modelEmpType === 5) {
      const current_errors = employee_insert_validator.validate(employee)
      setEmployeeErrors(current_errors)
      if (!Common.isEmptyObject(current_errors)) {
        return
      }
      const body = {
        password: employee.password
      }
      try {
        fetchWrapper.put(process.env.REACT_APP_API_URL + 'employees/' + employee.id + '/update_password', body).then((data) => {
          setShowEmployeeModel(false)
          if (data.success) {
            setSelectedEmployee(null)
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

  function handleOpenOrganizationModel(type) {
    setModelOrgType(type)
    setOrganizationErrors({})
    if (type === 1) {
      if (selectedItems.length < 1) {
        setAlertMessage('Vui lòng chọn đơn vị tổ chức cha để thêm tổ chức')
        setAlertShow(true)
        return
      }
      if (display_employees && display_employees.length > 0) {
        setAlertMessage('Không được tạo tổ chức con cho tổ chức có nhân viên')
        setAlertShow(true)
        return
      }
      setModelOrganizationTitle('Thêm tổ chức')
      setOrganization({ ...organization, "code": '', "name": '', "desc": '' });
      setShowOrganizationModel(true)
    } else if (type === 2) {
      if (selectedItems.length < 1) {
        setAlertMessage('Vui lòng chọn đơn vị tổ chức để sửa')
        setAlertShow(true)
        return
      }
      const selectedOrganization = organizations[selectedItems[0]]
      setModelOrganizationTitle('Sửa tổ chức')
      setOrganization({ ...organization, "code": selectedOrganization.code, "name": selectedOrganization.name, "desc": selectedOrganization.desc });
      setShowOrganizationModel(true)
    } else if (type === 3) {
      if (selectedItems.length < 1) {
        setAlertMessage('Vui lòng chọn đơn vị tổ chức để xem')
        setAlertShow(true)
        return
      }
      const selectedOrganization = organizations[selectedItems[0]]
      setModelOrganizationTitle('Xem tổ chức')
      setOrganization({ ...organization, "code": selectedOrganization.code, "name": selectedOrganization.name, "desc": selectedOrganization.desc });
      setShowOrganizationModel(true)
    } else if (type === 4) {
      if (selectedItems.length < 1) {
        setAlertMessage('Vui lòng chọn đơn vị tổ chức để xóa')
        setAlertShow(true)
        return
      }
      const selectedOrganization = organizations[selectedItems[0]]
      if (selectedOrganization.hasChildren) {
        setAlertMessage('Không được xóa tổ chức cha')
        setAlertShow(true)
        return
      }
      if (display_employees && display_employees.length > 0) {
        setAlertMessage('Không được xóa tổ chức có nhân viên')
        setAlertShow(true)
        return
      }
      setModelOrganizationTitle('Xóa tổ chức')
      setOrganization({ ...organization, "code": selectedOrganization.code, "name": selectedOrganization.name, "desc": selectedOrganization.desc });
      setShowOrganizationModel(true)
    } else if (type === 5) {
      if (selectedItems.length < 1) {
        setAlertMessage('Vui lòng chọn đơn vị tổ chức để phân quyền')
        setAlertShow(true)
        return
      }
    }
  }

  function handleSaveOrganization() {
    if (selectedItems.length < 1) {
      setAlertMessage('Vui lòng chọn đơn vị tổ chức')
      setAlertShow(true)
      return
    }
    const current_errors = organization_validator.validate(organization)
    setOrganizationErrors(current_errors)
    if (!Common.isEmptyObject(current_errors)) {
      return
    }
    const selected_id = parseInt(selectedItems[0])
    if (modelOrgType === 1) {
      const body = {
        code: organization.code,
        name: organization.name,
        description: organization.desc,
        parent_id: selected_id
      }
      try {
        fetchWrapper.post(process.env.REACT_APP_API_URL + "organizations/insert", body).then((data) => {
          setShowOrganizationModel(false)
          if (data.success) {
            fetchOrganization()
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
        code: organization.code,
        name: organization.name,
        description: organization.desc
      }
      try {
        fetchWrapper.put(process.env.REACT_APP_API_URL + 'organizations/' + selected_id + '/update', body).then((data) => {
          setShowOrganizationModel(false)
          if (data.success) {
            fetchOrganization()
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
        fetchWrapper.delete(process.env.REACT_APP_API_URL + 'organizations/' + selected_id + '/delete').then((data) => {
          setShowOrganizationModel(false)
          if (data.success) {
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
                  <button type="button" className="btn btn-danger btn-icon small_button ml-10" title="Xóa tổ chức" onClick={() => handleOpenOrganizationModel(4)}><i className="mdi mdi-delete"></i></button>
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
                  !Common.isEmptyObject(organizations) &&
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
                  <button type="button" className="btn btn-danger btn-icon small_button ml-10" title="Xóa nhân viên" onClick={() => handleOpenEmployeeModel(4)}><i className="mdi mdi-delete"></i> </button>
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
      <Modal showOverlay={true} size={'md'} show={showOrganizationModel} onClose={() => { setShowOrganizationModel(false) }}>
        <Modal.Header>
          <Modal.Title>
            {model_organization_title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="row">
            <label htmlFor="code" className="col-form-label col-sm-3">Mã tổ chức<span>*</span></label>
            <div className="col-sm-9">
              <Form.Control type="text" required readOnly={modelOrgType === 3 || modelOrgType === 4} name="code" value={organization.code} onChange={handleOrganizationChange} className="form-control" placeholder="" />
              {organization_errors.code && <div className="validation">{organization_errors.code}</div>}
            </div>
            <div className="validation"></div>
          </Form.Group>
          <Form.Group className="row">
            <label htmlFor="name" className="col-form-label col-sm-3">Tên tổ chức<span>*</span></label>
            <div className="col-sm-9">
              <Form.Control type="text" required readOnly={modelOrgType === 3 || modelOrgType === 4} name="name" value={organization.name} onChange={handleOrganizationChange} className="form-control" placeholder="" />
              {organization_errors.name && <div className="validation">{organization_errors.name}</div>}
            </div>
            <div className="validation"></div>
          </Form.Group>
          <Form.Group className="row">
            <label htmlFor="description" className="col-form-label col-sm-3">Mô tả</label>
            <div className="col-sm-9">
              <textarea className="form-control" readOnly={modelOrgType === 3 || modelOrgType === 4} name="desc" value={organization.desc} onChange={handleOrganizationChange} rows="4"></textarea>
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
          <button type="button" className="btn btn-secondary btn-icon small_button" onClick={() => { setShowOrganizationModel(false) }}>Đóng</button>
        </Modal.Footer>
      </Modal>
      {/* model employee */}
      <Modal showOverlay={true} size={'md'} show={showEmployeeModel} onClose={() => { setShowEmployeeModel(false) }}>
        <Modal.Header>
          <Modal.Title>
            {model_employee_title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="row">
            <label htmlFor="code" className="col-form-label col-sm-3">Mã nhân viên<span>*</span></label>
            <div className="col-sm-9">
              <Form.Control type="text" readOnly={[3, 4, 5].includes(modelEmpType)} name="code" value={employee.code} onChange={handleEmployeeChange} className="form-control" placeholder="" />
              {employee_errors.code && <div className="validation">{employee_errors.code}</div>}
            </div>
          </Form.Group>
          <Form.Group className="row">
            <label htmlFor="full_name" className="col-form-label col-sm-3">Họ và tên<span>*</span></label>
            <div className="col-sm-9">
              <Form.Control type="text" readOnly={[3, 4, 5].includes(modelEmpType)} name="full_name" value={employee.full_name} onChange={handleEmployeeChange} className="form-control" placeholder="" />
              {employee_errors.full_name && <div className="validation">{employee_errors.full_name}</div>}
            </div>
          </Form.Group>
          <Form.Group className="row">
            <label htmlFor="account" className="col-form-label col-sm-3">Tài khoản<span>*</span></label>
            <div className="col-sm-9">
              <Form.Control type="text" readOnly={[3, 4, 5].includes(modelEmpType)} name="account" value={employee.account} onChange={handleEmployeeChange} className="form-control" placeholder="" />
              {employee_errors.account && <div className="validation">{employee_errors.account}</div>}
            </div>
          </Form.Group>
          {(modelEmpType === 1 || modelEmpType === 5) &&
            <Form.Group className="row">
              <label htmlFor="password" className="col-form-label col-sm-3">Mật khẩu<span>*</span></label>
              <div className="col-sm-9">
                <Form.Control type="password" name="password" value={employee.password} onChange={handleEmployeeChange} className="form-control" placeholder="" />
                {employee_errors.password && <div className="validation">{employee_errors.password}</div>}
              </div>
            </Form.Group>
          }
          {(modelEmpType === 1 || modelEmpType === 5) &&
            <Form.Group className="row">
              <label htmlFor="confirm" className="col-form-label col-sm-3">Nhập lại mật khẩu<span>*</span></label>
              <div className="col-sm-9">
                <Form.Control type="password" name="confirm" value={employee.confirm} onChange={handleEmployeeChange} className="form-control" placeholder="" />
                {employee_errors.confirm && <div className="validation">{employee_errors.confirm}</div>}
              </div>
            </Form.Group>
          }
        </Modal.Body>
        <Modal.Footer>
          {([1, 2, 5].includes(modelEmpType)) &&
            <button type="button" className="btn btn-primary btn-icon small_button" onClick={() => handleSaveEmployee()}>Lưu</button>
          }
          {(modelEmpType === 4) &&
            <button type="button" className="btn btn-danger btn-icon small_button" onClick={() => handleSaveEmployee()}>Xóa</button>
          }
          <button type="button" className="btn btn-secondary btn-icon small_button" onClick={() => { setShowEmployeeModel(false) }}>Đóng</button>
        </Modal.Footer>
      </Modal>
      {/* model alert */}
      <Alert message={alert_message} show={alert_show} onClose={() => setAlertShow(false)} />
    </div>
  )
}
export default List
