import React, { useState, useEffect } from 'react';
import { fetchWrapper } from '../../utils/fetch-wrapper';
import { useHistory } from "react-router-dom";
import Modal from '../components/Modal';
import Alert from '../components/Alert';
import { Form } from 'react-bootstrap';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

function Layout(props) {
    const [stock_lines, setStockLines] = useState([]);
    const [selected_stock_line, setSelectedStockLine] = useState(null);
    const [showStockLineModel, setShowStockLineModel] = useState(false);
    const [showStockShelfModel, setShowStockShelfModel] = useState(false);
    const [model_stock_line_title, setModelStockLineTitle] = useState();
    const [model_stock_shelf_title, setModelStockShelfTitle] = useState();
    const [stock_errors, setStockErrors] = useState({});
    const [stock_line, setStockLine] = useState({ id: 0, code: "", name: "", description: "", status: 1 });
    const [stock_shelf, setStockShelf] = useState({ id: 0, code: "", name: "", description: "", status: 1 });
    //alert message
    const [alert_message, setAlertMessage] = useState('');
    const [alert_show, setAlertShow] = useState(false);
    const [stock_id, setStockId] = useState(0);
    const [selected_shelf, setSelectedShelf] = useState(0);
    const handleLineChange = (event) => {
        event.persist();
        setStockLine({ ...stock_line, [event.target.name]: event.target.value });
    };
    const handleShelfChange = (event) => {
        event.persist();
        setStockShelf({ ...stock_shelf, [event.target.name]: event.target.value });
    };
    const [modelLineType, setModelLineType] = useState(0);
    const [modelShelfType, setModelShelfType] = useState(0);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleOpenMenu = (event, shelf) => {
        setSelectedShelf(shelf)
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleViewShelf = () => {
        setModelShelfType(3)
        setStockErrors({})
        setModelStockShelfTitle('Xem kệ')
        setStockShelf({ ...stock_shelf, "code": selected_shelf.code, "name": selected_shelf.name, "description": selected_shelf.description ?? '', "status": 1 });
        setShowStockShelfModel(true)
        setAnchorEl(null);
    };
    const handleEditShelf = () => {
        setModelShelfType(2)
        setStockErrors({})
        setModelStockShelfTitle('Sửa kệ')
        setStockShelf({ ...stock_shelf, "code": selected_shelf.code, "name": selected_shelf.name, "description": selected_shelf.description ?? '', "status": 1 });
        setShowStockShelfModel(true)
        setAnchorEl(null);
    };
    const handleDeleteShelf = () => {
        fetchWrapper.delete(process.env.REACT_APP_API_URL + 'stock_shelfs/' + selected_shelf.id + '/delete').then((data) => {
            setAnchorEl(null);
            if (data.success) {
                setSelectedStockLine(null)
                fetchStockLines(stock_id)
            } else {
                setAlertMessage('Có lỗi xảy ra trong quá trình thực hiện')
                setAlertShow(true)
            }
        })
        setAnchorEl(null);
    };    

    let history = useHistory();
    useEffect(() => {
        let stock_id = parseInt(props.match.params.id);
        setStockId(stock_id)
        setStockLine({ ...stock_line, stock_id: stock_id });
        fetchStockLines(stock_id)
    }, [])

    function fetchStockLines(stock_id) {
        try {
            fetchWrapper.get(process.env.REACT_APP_API_URL + 'stock_lines?stock_id=' + stock_id).then((data) => {
                if (data.success) {
                    setStockLines(data.data)
                } else {
                    console.log(data)
                }
            })
        } catch (error) {
            console.error(error);
        }
    }

    function handleReturn() {
        history.push("/stocks/list");
    }

    function handleOpenStockLineModel(type) {
        setModelLineType(type)
        setStockErrors({})
        if (type === 1) {
            setModelStockLineTitle('Thêm line')
            setStockLine({ ...stock_line, "code": '', "name": '', "description": '', "status": 1 });
            setShowStockLineModel(true)
        }
        if (type === 2) {
            if(selected_stock_line === null){
                setAlertMessage('Vui lòng chọn line để sửa')
                setAlertShow(true)
                return
            }
            setModelStockLineTitle('Sửa line')
            setStockLine({ ...stock_line, "code": selected_stock_line.code, "name": selected_stock_line.name, "description": selected_stock_line.description ?? '', "status": 1 });
            setShowStockLineModel(true)
        }if (type === 3) {
            if(selected_stock_line === null){
                setAlertMessage('Vui lòng chọn line để xóa')
                setAlertShow(true)
                return
            }
            setModelStockLineTitle('Xóa line')
            setStockLine({ ...stock_line, "code": selected_stock_line.code, "name": selected_stock_line.name, "description": selected_stock_line.description ?? '', "status": 1 });
            setShowStockLineModel(true)
        }
    }

    function handleSaveStockLine() {
        if (modelLineType === 1) {
            const body = {
                code: stock_line.code,
                name: stock_line.name,
                description: stock_line.description,
                status: stock_line.status,
                stock_id: stock_line.stock_id
            }
            try {
                fetchWrapper.post(process.env.REACT_APP_API_URL + 'stock_lines/insert', body).then((data) => {
                    setShowStockLineModel(false)
                    if (data.success) {
                        setSelectedStockLine(null)
                        fetchStockLines(stock_id)
                    } else {
                        setAlertMessage('Có lỗi xảy ra trong quá trình thực hiện')
                        setAlertShow(true)
                    }
                })
            } catch (error) {
                console.error(error);
            }
        } else if (modelLineType === 2) {
            const body = {
                code: stock_line.code,
                name: stock_line.name,
                description: stock_line.description,
                status: stock_line.status,
                stock_id: stock_line.stock_id
            }
            try {
                fetchWrapper.put(process.env.REACT_APP_API_URL + 'stock_lines/' + selected_stock_line.id + '/update', body).then((data) => {
                    setShowStockLineModel(false)
                    if (data.success) {
                        setSelectedStockLine(null)
                        fetchStockLines(stock_id)
                    } else {
                        setAlertMessage('Có lỗi xảy ra trong quá trình thực hiện')
                        setAlertShow(true)
                    }
                })
            } catch (error) {
                console.error(error);
            }
        } else if (modelLineType === 3) {            
            try {
                fetchWrapper.delete(process.env.REACT_APP_API_URL + 'stock_lines/' + selected_stock_line.id + '/delete').then((data) => {
                    setShowStockLineModel(false)
                    if (data.success) {
                        setSelectedStockLine(null)
                        fetchStockLines(stock_id)
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

    function handleOpenStockShelfModel(line_id, type) {
        setModelShelfType(type)
        setStockErrors({})
        if (type === 1) {
            setModelStockShelfTitle('Thêm kệ')
            setStockShelf({ ...stock_shelf, "code": '', "name": '', "description": '', "status": 1 });
            setShowStockShelfModel(true)
        }
    }

    function handleSaveStockShelf() {
        if (modelShelfType === 1) {
            const body = {
                code: stock_shelf.code,
                name: stock_shelf.name,
                description: stock_shelf.description,
                status: stock_shelf.status,
                stock_line_id: selected_stock_line.id
            }
            try {
                fetchWrapper.post(process.env.REACT_APP_API_URL + 'stock_shelfs/insert', body).then((data) => {
                    setShowStockShelfModel(false)
                    if (data.success) {
                        setSelectedStockLine(null)
                        fetchStockLines(stock_id)
                    } else {
                        setAlertMessage('Có lỗi xảy ra trong quá trình thực hiện')
                        setAlertShow(true)
                    }
                })
            } catch (error) {
                console.error(error);
            }
        } else if (modelShelfType === 2) {
            const body = {
                code: stock_shelf.code,
                name: stock_shelf.name,
                description: stock_shelf.description,
                status: stock_shelf.status,
                stock_line_id: selected_stock_line.id
            }
            console.log(body)
            console.log(selected_shelf.id)
            try {
                fetchWrapper.put(process.env.REACT_APP_API_URL + 'stock_shelfs/' + selected_shelf.id + '/update', body).then((data) => {
                    setShowStockShelfModel(false)
                    if (data.success) {
                        setSelectedStockLine(null)
                        fetchStockLines(stock_id)
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

    return (
        <div>
            <div className="page-header">
                <h3 className="page-title"> Layout kho</h3>
                <div className='fl-right mb-10'>
                    <button type="button" className="btn btn-primary btn-icon small_button" title="Thêm line" onClick={() => handleOpenStockLineModel(1)}><i className="mdi mdi-plus-box"></i></button>
                    <button type="button" className="btn btn-success btn-icon small_button ml-10" title="Sửa line" onClick={() => handleOpenStockLineModel(2)}><i className="mdi mdi-pencil"></i></button>
                    <button type="button" className="btn btn-danger btn-icon small_button ml-10" title="Xóa line" onClick={() => handleOpenStockLineModel(3)}><i className="mdi mdi-delete"></i> </button>
                    <button type="button" className="btn btn-warning btn-icon small_button ml-10" onClick={handleReturn}><i className="mdi mdi-keyboard-return"></i></button>
                </div>
            </div>
            {stock_lines && stock_lines.map(function (stock_line, index) {
                return (
                    <div className="row" key={"stock_lines-" + index}>
                        <div className="col-12 grid-margin stretch-card">
                            <div className={selected_stock_line && selected_stock_line.id === stock_line.id ? 'card stock-layout-line selected-row' : 'card stock-layout-line'} onClick={() => setSelectedStockLine(stock_line)} >
                                <div className="card-body pt-5">
                                    <div>
                                        <h4 className="card-title fl-left stock-line-title"><label className="badge badge-danger line-title">{stock_line.name}</label></h4>
                                        <div className='fl-right mb-10'>
                                            <button type="button" className="btn btn-primary btn-icon round_small_button" title="Thêm kệ" onClick={() => handleOpenStockShelfModel(stock_line.id, 1)} ><i className="mdi mdi-plus-box"></i></button>
                                        </div>
                                        <div className='clear-both'></div>
                                    </div>
                                    {stock_line.shelfs && stock_line.shelfs.map(function (shelf, index) {
                                        return (
                                            <button key={"button-" + index} type="button" className="btn btn-shelf btn-icon small_button ml-10 shelf" title="Sửa nhóm vật tư" onClick={(event) => handleOpenMenu(event, shelf)}><div>{shelf.name}</div><div>100/1000</div></button>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <MenuItem onClick={handleViewShelf}><i className="mdi mdi-eye"></i> <span className='ml-10'>Xem</span></MenuItem>
                <MenuItem onClick={handleEditShelf}><i className="mdi mdi-pencil"></i> <span className='ml-10'>Sửa</span></MenuItem>
                <MenuItem onClick={handleDeleteShelf}><i className="mdi mdi-delete"></i> <span className='ml-10'>Xóa</span></MenuItem>
            </Menu>
            <Modal showOverlay={true} size={'md'} show={showStockLineModel} onClose={() => { setShowStockLineModel(false) }}>
                <Modal.Header>
                    <Modal.Title>
                        {model_stock_line_title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="row">
                        <label htmlFor="code" className="col-form-label col-sm-2">Mã line<span>*</span></label>
                        <div className="col-sm-10">
                            <Form.Control type="text" readOnly={[3, 4, 5].includes(modelLineType)} name="code" value={stock_line.code} onChange={handleLineChange} className="form-control" placeholder="" />
                            {stock_errors.code && <div className="validation">{stock_errors.code}</div>}
                        </div>
                    </Form.Group>
                    <Form.Group className="row">
                        <label htmlFor="name" className="col-form-label col-sm-2">Tên line<span>*</span></label>
                        <div className="col-sm-10">
                            <Form.Control type="text" readOnly={[3, 4, 5].includes(modelLineType)} name="name" value={stock_line.name} onChange={handleLineChange} className="form-control" placeholder="" />
                            {stock_errors.name && <div className="validation">{stock_errors.name}</div>}
                        </div>
                    </Form.Group>
                    <Form.Group className="row">
                    </Form.Group>
                    <Form.Group className="row">
                        <label htmlFor="description" className="col-form-label col-sm-2">Mô tả</label>
                        <div className="col-sm-10">
                            <textarea className="form-control" readOnly={[3, 4, 5].includes(modelLineType)} name="description" value={stock_line.description} onChange={handleLineChange} rows="4"></textarea>
                        </div>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    {([1, 2, 5].includes(modelLineType)) &&
                        <button type="button" className="btn btn-primary btn-icon small_button" onClick={() => handleSaveStockLine()}>Lưu</button>
                    }
                    {(modelLineType === 3) &&
                        <button type="button" className="btn btn-danger btn-icon small_button" onClick={() => handleSaveStockLine()}>Xóa</button>
                    }
                    <button type="button" className="btn btn-secondary btn-icon small_button" onClick={() => { setShowStockLineModel(false) }}>Đóng</button>
                </Modal.Footer>
            </Modal>

            <Modal showOverlay={true} size={'md'} show={showStockShelfModel} onClose={() => { setShowStockShelfModel(false) }}>
                <Modal.Header>
                    <Modal.Title>
                        {model_stock_shelf_title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="row">
                        <label htmlFor="code" className="col-form-label col-sm-2">Mã kệ<span>*</span></label>
                        <div className="col-sm-10">
                            <Form.Control type="text" readOnly={[3, 4, 5].includes(modelShelfType)} name="code" value={stock_shelf.code} onChange={handleShelfChange} className="form-control" placeholder="" />
                            {stock_errors.code && <div className="validation">{stock_errors.code}</div>}
                        </div>
                    </Form.Group>
                    <Form.Group className="row">
                        <label htmlFor="name" className="col-form-label col-sm-2">Tên kệ<span>*</span></label>
                        <div className="col-sm-10">
                            <Form.Control type="text" readOnly={[3, 4, 5].includes(modelShelfType)} name="name" value={stock_shelf.name} onChange={handleShelfChange} className="form-control" placeholder="" />
                            {stock_errors.name && <div className="validation">{stock_errors.name}</div>}
                        </div>
                    </Form.Group>
                    <Form.Group className="row">
                    </Form.Group>
                    <Form.Group className="row">
                        <label htmlFor="description" className="col-form-label col-sm-2">Mô tả</label>
                        <div className="col-sm-10">
                            <textarea className="form-control" readOnly={[3, 4, 5].includes(modelShelfType)} name="description" value={stock_shelf.description} onChange={handleShelfChange} rows="4"></textarea>
                        </div>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    {([1, 2, 5].includes(modelShelfType)) &&
                        <button type="button" className="btn btn-primary btn-icon small_button" onClick={() => handleSaveStockShelf()}>Lưu</button>
                    }
                    {(modelShelfType === 4) &&
                        <button type="button" className="btn btn-danger btn-icon small_button" onClick={() => handleSaveStockShelf()}>Xóa</button>
                    }
                    <button type="button" className="btn btn-secondary btn-icon small_button" onClick={() => { setShowStockShelfModel(false) }}>Đóng</button>
                </Modal.Footer>
            </Modal>
            <Alert message={alert_message} show={alert_show} onClose={() => setAlertShow(false)} />
        </div>
    )
}

export default Layout
