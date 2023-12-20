import React, {useContext, useEffect, useState} from 'react';
import {
    Button, Col,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Form,
    FormControl,
    Modal,
    Row
} from "react-bootstrap";
import {Context} from "../../index";
import {createDevice, fetchBrands, fetchTypes} from "../../http/deviceAPI";
import {observer} from "mobx-react-lite";



const CreateDevice = observer(({show, onHide}) => {
    const {device} = useContext(Context)
    const  [name, setName] = useState('')
    const  [price, setPrice] = useState(0)
    const  [file, setFile] = useState(null)
    const  [info, setInfo] = useState([])

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
    }, [device]);

    const addInfo = () => {
      setInfo([...info, {title: '', description: '', number: Date.now()}])
    }
    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }
    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value}: i))
    }

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addDevice = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('img', file)
        formData.append('brandId', device.selectedBrand.id)
        formData.append('typeId', device.selectedType.id)
        formData.append('info', JSON.stringify(info))
        createDevice(formData).then(data => onHide() )
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавити девайс
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-2">
                        <DropdownToggle>{device.selectedType.name || 'Виберіть тип' }</DropdownToggle>
                        <DropdownMenu>
                            {device.types.map(type =>
                                <DropdownItem
                                    onClick={() => device.setSelectedType(type)}
                                    key={type.id}
                                >
                                    {type.name}
                                </DropdownItem>
                            )}
                        </DropdownMenu>
                    </Dropdown>
                    <Dropdown className="mt-2">
                        <DropdownToggle>{device.selectedBrand.name || 'Виберіть бренд'}</DropdownToggle>
                        <DropdownMenu>
                            {device.brands.map(Brand =>
                                <DropdownItem
                                    onClick={() => device.setSelectedBrand(Brand)}
                                    key={Brand.id}
                                >
                                    {Brand.name}
                                </DropdownItem>
                            )}
                        </DropdownMenu>
                    </Dropdown>
                    <FormControl
                        onChange={e => setName(e.target.value)}
                        value={name}
                        className="mt-3"
                        placeholder="Введіть назву девайса"
                    />
                    <FormControl
                        value={price}
                        onChange={e => setPrice(Number(e.target.value))}
                        className="mt-3"
                        placeholder="Введіть вартість девайса"
                        type="number"
                    />
                    <FormControl
                        className="mt-3"
                        type="file"
                        onChange={selectFile}
                    />
                    <hr />
                    <Button
                        onClick={addInfo}
                        variant={"outline-dark"}
                    >
                        Добавити нову властивість
                    </Button>
                    {info.map(i =>
                        <Row className="mt-4" key={i.number}>
                            <Col md={4}>
                                <FormControl
                                    value={i.title}
                                    onChange={(e) => changeInfo('title', e.target.value, i.number)}
                                    placeholder='Введіть назву властивості'
                                />
                            </Col>
                            <Col md={4}>
                                <FormControl
                                    value={i.description}
                                    onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                    placeholder='Введіть опис властивості'
                                />
                            </Col>
                            <Col md={4}>
                                <Button
                                    onClick={() => removeInfo(i.number)}
                                    variant="outline-danger"
                                >
                                    Видалити
                                </Button>
                            </Col >
                        </Row>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрити</Button>
                <Button variant="outline-success" onClick={addDevice}>Добавити</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateDevice;