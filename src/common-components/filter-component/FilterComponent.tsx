import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    Menu,
    Paper,
    Slider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import './style/style.scss';
import { useAppDispatch, useAppSelector } from '../../services/store/store';
import {
    clearMotorFields,
    getMotorBrand,
    getMotorModel,
    getMotorType,
} from '../../services/features/motorbike/motorFields';
import { filterMotor } from '../../services/features/motorbike/motorbikeSlice';
import useFormatCurrency from '../../hooks/useFormatCurrency';

interface FilterComponentProps {
    anchorElFilter: HTMLElement | null;
    handleCloseFilter: () => void;
}

const FilterComponent: React.FC<FilterComponentProps> = ({
    anchorElFilter,
    handleCloseFilter,
}) => {
    const dispatch = useAppDispatch();
    const { motorBrands, motorTypes, motorModels } = useAppSelector(
        (state) => state.motorFields,
    );
    const formatCurrency = useFormatCurrency();

    const [selectedFiltersBrand, setSelectedFiltersBrand] = useState<number[]>(
        [],
    );
    const [selectedFiltersModel, setSelectedFiltersModel] = useState<number[]>(
        [],
    );
    const [selectedFiltersType, setSelectedFiltersType] = useState<number[]>(
        [],
    );
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100000000);
    const [sliderValue, setSliderValue] = useState([0, 100000000]);

    const handleCheckboxChangeBrand = (value: number) => {
        if (selectedFiltersBrand.includes(value)) {
            setSelectedFiltersBrand(
                selectedFiltersBrand.filter((item) => item !== value),
            );
        } else {
            setSelectedFiltersBrand([...selectedFiltersBrand, value]);
        }
    };
    const handleCheckboxChangeModel = (value: number) => {
        if (selectedFiltersModel.includes(value)) {
            setSelectedFiltersModel(
                selectedFiltersModel.filter((item) => item !== value),
            );
        } else {
            setSelectedFiltersModel([...selectedFiltersModel, value]);
        }
    };

    const handleCheckboxChangeType = (value: number) => {
        if (selectedFiltersType.includes(value)) {
            setSelectedFiltersType(
                selectedFiltersType.filter((item) => item !== value),
            );
        } else {
            setSelectedFiltersType([...selectedFiltersType, value]);
        }
    };

    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        if (Array.isArray(newValue)) {
            setSliderValue(newValue);
            setMinPrice(newValue[0]);
            setMaxPrice(newValue[1]);
        }
    };

    useEffect(() => {
        dispatch(clearMotorFields());
        dispatch(getMotorBrand());
        dispatch(getMotorType());
        dispatch(getMotorModel());
    }, [dispatch]);

    const handleFilter = () => {
        const filterParams = {
            brandId: selectedFiltersBrand.map(Number),
            modelId: selectedFiltersModel.map(Number),
            minPrice: minPrice,
            maxPrice: maxPrice,
            motorTypeId: selectedFiltersType.map(Number),
        };
        dispatch(filterMotor(filterParams));
        handleCloseFilter();
    };

    const handleClearFilter = () => {
        setSelectedFiltersBrand([]);
        setSelectedFiltersModel([]);
        setSelectedFiltersType([]);
        setMinPrice(0);
        setMaxPrice(100000000);
        setSliderValue([0, 100000000]);
        dispatch(filterMotor({}));
        handleCloseFilter();
    };

    return (
        <Menu
            PaperProps={{
                style: {
                    background: '#e9f7ec',
                    width: '620px',
                    height: '560px',
                },
            }}
            sx={{ mt: '2.3rem' }}
            id="filter"
            anchorEl={anchorElFilter}
            anchorOrigin={{
                vertical: 'center',
                horizontal: 'center',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={Boolean(anchorElFilter)}
            onClose={handleCloseFilter}
        >
            <Box margin={2}>
                <Typography
                    variant="h5"
                    sx={{
                        mb: '10px',
                        paddingLeft: '6px',
                        fontWeight: '600',
                        textAlign: 'center',
                    }}
                >
                    Bộ Lọc
                </Typography>

                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell className="header-table-filter">
                                    Brand
                                </TableCell>
                                <TableCell className="header-table-content-filter">
                                    {motorBrands &&
                                        motorBrands.map((option) => (
                                            <FormControlLabel
                                                key={option.brandId}
                                                control={
                                                    <Checkbox
                                                        checked={selectedFiltersBrand.includes(
                                                            option.brandId,
                                                        )}
                                                        onChange={() =>
                                                            handleCheckboxChangeBrand(
                                                                option.brandId,
                                                            )
                                                        }
                                                    />
                                                }
                                                label={option.brandName}
                                            />
                                        ))}
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell className="header-table-filter">
                                    Model
                                </TableCell>
                                <TableCell className="header-table-content-filter">
                                    {motorModels &&
                                        motorModels.map((option) => (
                                            <FormControlLabel
                                                key={option.modelId}
                                                control={
                                                    <Checkbox
                                                        checked={selectedFiltersModel.includes(
                                                            option.modelId,
                                                        )}
                                                        onChange={() =>
                                                            handleCheckboxChangeModel(
                                                                option.modelId,
                                                            )
                                                        }
                                                    />
                                                }
                                                label={option.modelName}
                                            />
                                        ))}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="header-table-filter">
                                    Giá
                                </TableCell>
                                <TableCell className="header-table-content-filter">
                                    <Box sx={{ width: 350 }}>
                                        <Slider
                                            value={sliderValue}
                                            onChange={handleSliderChange}
                                            valueLabelFormat={(value) =>
                                                // `${value}đ`

                                                formatCurrency (value)
                                            }
                                            valueLabelDisplay="on"
                                            step={1000000}
                                            min={0}
                                            max={100000000}
                                        />
                                    </Box>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="header-table-filter">
                                    Loại xe
                                </TableCell>
                                <TableCell className="header-table-content-filter">
                                    {motorTypes &&
                                        motorTypes.map((option) => (
                                            <FormControlLabel
                                                key={option.motorTypeId}
                                                control={
                                                    <Checkbox
                                                        checked={selectedFiltersType.includes(
                                                            option.motorTypeId,
                                                        )}
                                                        onChange={() =>
                                                            handleCheckboxChangeType(
                                                                option.motorTypeId,
                                                            )
                                                        }
                                                    />
                                                }
                                                label={option.title}
                                            />
                                        ))}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box
                    display="flex"
                    justifyContent="flex-end"
                    marginTop={1}
                    marginRight={2}
                    gap={1}
                >
                    <Button
                        variant="outlined"
                        color="warning"
                        onClick={handleClearFilter}
                    >
                        Bỏ lọc
                    </Button>
                    <Button
                        variant="outlined"
                        color="success"
                        onClick={handleFilter}
                    >
                        Áp dụng
                    </Button>
                </Box>
            </Box>
        </Menu>
    );
};

export default FilterComponent;
