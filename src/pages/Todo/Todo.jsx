import { useEffect, useState } from 'react';
import { fetchTodos } from '../../data/todos';
import './Todo.css';
import { useReducer } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import { useRef } from 'react';

function Todo() {


    const [todosRaw, setTodoRaw] = useState([])
    const [todos, setTodos] = useState([])

    const [onlyWaiting, setOnlyWaiting] = useState(false)
    const [itemPerPage, setItemPerPage] = useState(5)
    const [NumPages, setNumPages] = useState(1)
    const [curPage, setCurPage] = useState(1)

    // modal handlers
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    useEffect(() => {
        setTodoRaw(fetchTodos())
        setCurPage(1)
    }, []) // load

    useEffect(() => {
        if (onlyWaiting) {
            setTodos(todosRaw.filter((todo) => { return !todo.completed }))
        } else {
            //show all
            setTodos(todosRaw)
        }

    }, [todosRaw, onlyWaiting, itemPerPage])

    useEffect(() => {
        console.log(`onlyWaiting : ${onlyWaiting}`)
    }, [onlyWaiting])

    useEffect(() => {
        console.log(`itemPerPage : ${itemPerPage}`)
        setNumPages(Math.ceil(todosRaw.length / itemPerPage))
    }, [itemPerPage, todosRaw])

    useEffect(() => {
        // setCurPage((p) => (p >= NumPages ? NumPages : p))
        setCurPage(1)
    }, [NumPages])

    //event handler
    function deleteClick(id) {
        setTodoRaw(todosRaw.filter((todo) => todo.id !== id))
    }

    function waitingClick(id) {
        const todoSelectess = todosRaw.find((todo) => {
            return todo.id === id
        })
        todoSelectess.completed = true
        setTodoRaw([...todosRaw])
    }

    function addClick(id, title) {
        const newItem = {
            id,
            title,
            completed: false,
            userID: 1,
        }
        setTodoRaw([...todosRaw, newItem])

    }

    const newIdRef = useRef()
    const newTitleRef = useRef()

    return (
        <div className='todo-container'>
            {/* modals */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <span className='bi bi-plus-lg'>&nbsp;Add todo</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>ID:</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                disabled
                                value={
                                    Number(todosRaw.reduce((prev, todo) =>
                                        todo.id > prev ? todo.id : prev
                                        , 0)) + 1
                                }
                                ref={newIdRef}
                            />
                        </Form.Group><Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Title:</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                ref={newTitleRef}
                            />
                        </Form.Group>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        <span className='bi bi-x-lg'>&nbsp;Cancel</span>
                    </Button>
                    <Button variant="primary"
                        onClick={
                            () => {
                                const id = newIdRef.current.value
                                const title = newTitleRef.current.value.trim()
                                if (title === "") {
                                    alert('Title cannot be emty')
                                    newTitleRef.current.focus()
                                } else{
                                   addClick(id, title)
                                handleClose() 

                                }
                                
                            }
                        }>
                        <span className='bi bi-plus-lg'>&nbsp;Add</span>
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* filters */}
            <div className='todo-filters-container'>
                <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox"
                        id="flexSwitchCheckChecked"
                        onClick={(e) => { setOnlyWaiting(e.target.checked) }}
                    />
                    <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
                        Show only&nbsp;
                        <button className='btn btn-warning'

                        >waiting&nbsp;
                            <span className='bi bi-clock'></span>
                        </button>
                    </label>
                </div>
                <select
                    class="form-select"
                    aria-label="Default select example"
                    defaultValue={5}
                    style={{ width: '200px' }}
                    onChange={(e) => { setItemPerPage(e.target.value) }}
                >
                    <option value={5} selected>5 item per pages</option>
                    <option value={10}>10 item per pages</option>
                    <option value={50}>50 item per pages</option>
                    <option value={100}>100 item per pages</option>
                </select>
            </div>
            {/* table */}
            <table className='table table-striped'>
                <thead className='table-dark'>
                    <tr >
                    <th style={{ width: '5%'}} valign='middle'>ID</th>
                        <th>TITLE</th>
                        <th style={{ textAlign: 'right',width: '20%' }} valign='middle'>
                            Completed&nbsp;
                            <button className='btn btn-primary'
                                onClick={() => {
                                    handleShow()
                                }}>
                                <span className="bi bi-plus-lg"

                                ></span>
                            </button>
                        </th>
                    </tr>
                </thead>



                <tbody>

                    {
                        todos.filter((todo, index) => {
                            const min = (curPage - 1) * itemPerPage
                            const max = curPage * itemPerPage - 1
                            return index >= min && index <= max
                        }).map((todo) => {
                            return (
                                <tr key={todo.id}>
                                    <td><span className='badge bg-secondary'>{todo.id}</span></td>
                                    <td style={{ textAlign: 'left' }}>{todo.title}</td>
                                    <td style={{ textAlign: 'right' }}>
                                        {todo.completed ? (
                                            <span className='badge bg-success'>
                                                done &nbsp;
                                                <span className='bi bi-check'></span>
                                            </span>
                                        ) : (
                                            <button className='btn btn-warning'
                                                onClick={() => {
                                                    waitingClick(todo.id)
                                                }}
                                            >
                                                <span className='bi bi-clock'></span> Waiting
                                            </button>
                                        )}
                                        &nbsp;
                                        <button className='btn btn-danger'
                                            onClick={() => { deleteClick(todo.id) }}
                                        >
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            )
                        }
                        )}

                </tbody>
            </table>

            {/* page control */}

            <div>
                <button className='btn btn-outline-primary todo-space'
                    onClick={() => { setCurPage(1) }}
                    disabled={curPage === 1}
                >First</button>
                <button className='btn btn-outline-primary todo-space'
                    onClick={() => { curPage > 1 && setCurPage(curPage - 1) }}
                    disabled={curPage === 1}
                >Previous</button>
                <span className='todo-space'>{curPage}&nbsp;/&nbsp;{NumPages}</span>
                <button className='btn btn-outline-primary todo-space'
                    onClick={() => { curPage < NumPages && setCurPage(curPage + 1) }}
                    disabled={curPage === NumPages}
                >Next</button>
                <button className='btn btn-outline-primary todo-space'
                    onClick={() => { setCurPage(NumPages) }}
                    disabled={curPage === NumPages}
                >Last</button>
            </div>


        </div>
    );
}

export default Todo;