import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Dropdown } from 'react-bootstrap';

const BrandBar = observer(() => {
    const { device } = useContext(Context);

    const handleBrandChange = (brand) => {
        device.setSelectedBrand(brand);
    };

    return (
        <Dropdown className="mt-3 mb-3">
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                {device.selectedBrand ? device.selectedBrand.name : 'Выберите бренд'}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {device.brands.map(brand => (
                    <Dropdown.Item key={brand.id} onClick={() => handleBrandChange(brand)}>
                        {brand.name}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
});

export default BrandBar;