import FilterOptions from './FilterOptions'
import { Button, Tooltip } from 'antd'
import { ReloadOutlined } from '@ant-design/icons';

interface FilterOptionWithResetProps {
    onResetFilters: () => void;
    setFilterOptions: (selectedOptions: string[]) => void;
}
const FilterOptionWithReset = ({ onResetFilters, setFilterOptions }: FilterOptionWithResetProps) => {
    return (
        <>
            <FilterOptions setFilterOptions={setFilterOptions} />

            {/* Reset Filters */}
            <Tooltip title="Reset Filters">
                <Button
                    icon={<ReloadOutlined />}
                    onClick={onResetFilters}
                    type="default"
                />
            </Tooltip>
        </>
    )
}

export default FilterOptionWithReset