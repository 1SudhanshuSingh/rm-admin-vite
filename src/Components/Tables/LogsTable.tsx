import { Table } from 'rsuite';
import { useState } from 'react';
import { Box } from '@chakra-ui/react';
import { LogsData } from '../../Constant/LogsConst';

const { Column, HeaderCell, Cell } = Table;

interface Log {
    id: number;
    date: string;
    _filename: string;
    downloadLink: string;
}

interface ActionCellProps {
    rowData?: Log;
    dataKey: string;
}

const LogsTable = () => {
    const [limit] = useState(10);
    const [page] = useState(1);

    const defaultData = LogsData;

    const data = defaultData.filter((_, i) => {
        const start = limit * (page - 1);
        const end = start + limit;
        return i >= start && i < end;
    });

    const ActionCell = ({ rowData, ...props }: ActionCellProps) => {
        return (
            <Cell {...props}>
                <a href='/somefile.txt' download style={{
                    textDecoration:'underline'
                }}>
                    Download
                </a>
            </Cell>
        );
    };

    return (
        <Box mt={10} display={'flex'} justifyContent={'center'} >
            <Table width={570} data={data}>
                <Column width={70} align="center">
                    <HeaderCell>Id</HeaderCell>
                    <Cell dataKey="id" />
                </Column>

                <Column width={200} align="center">
                    <HeaderCell>Name</HeaderCell>
                    <Cell dataKey="_filename" />
                </Column>

                <Column width={200} align="center">
                    <HeaderCell>Date</HeaderCell>
                    <Cell dataKey="date" />
                </Column>

                <Column width={100} align="center" fixed="right" >
                    <HeaderCell>Download</HeaderCell>
                    <ActionCell dataKey="id" />
                </Column>
            </Table>
        </Box>
    );
};

export default LogsTable;
