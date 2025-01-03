import React, { useEffect, useRef } from 'react'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import DescriptionIcon from '@mui/icons-material/Description'
import DataObjectIcon from '@mui/icons-material/DataObject'
import { visuallyHidden } from '@mui/utils'
import { saveAs } from 'file-saver'
import { Measure } from '../pages/DataPage'
import Visualization from './Visualization'

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) return -1
  if (b[orderBy] > a[orderBy]) return 1
  return 0
}

type Order = 'asc' | 'desc'

function getComparator<Key extends keyof any>(order: Order, orderBy: Key) {
  return order === 'desc'
    ? (
        a: { [key in Key]: number | string },
        b: { [key in Key]: number | string }
      ) => descendingComparator(a, b, orderBy)
    : (
        a: { [key in Key]: number | string },
        b: { [key in Key]: number | string }
      ) => -descendingComparator(a, b, orderBy)
}

interface HeadCell {
  disablePadding: boolean
  id: keyof Measure
  label: string
  numeric: boolean
}

const headCells: readonly HeadCell[] = [
  { id: 'sensor_id', numeric: false, disablePadding: true, label: 'Sensor ID' },
  { id: 'value', numeric: true, disablePadding: false, label: 'Value' },
  {
    id: 'timestamp',
    numeric: true,
    disablePadding: false,
    label: 'Timestamp',
  },
]

interface EnhancedTableHeadProps {
  numSelected: number
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Measure
  ) => void
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  order: Order
  orderBy: string
  rowCount: number
}

function EnhancedTableHead(props: EnhancedTableHeadProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props
  const createSortHandler =
    (property: keyof Measure) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property)
    }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox
            color='primary'
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all measurements' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id && (
                <Box component='span' sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              )}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

interface EnhancedTableToolbarProps {
  numSelected: number
  downloadData: (format: 'csv' | 'json') => void
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected, downloadData } = props

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%', fontWeight: '600' }}
          color='inherit'
          variant='subtitle1'
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant='h6'
          component='div'
          className='font-semibold text-gray-700'
        >
          Measurements
        </Typography>
      )}

      {numSelected > 0 && (
        <>
          <Tooltip title='Download JSON' onClick={() => downloadData('json')}>
            <IconButton>
              <DataObjectIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title='Download CSV' onClick={() => downloadData('csv')}>
            <IconButton>
              <DescriptionIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
    </Toolbar>
  )
}

const arraysAreEqual = (arr1: Measure[], arr2: Measure[]) => {
  if (arr1.length !== arr2.length) return false

  const arr1Sorted = [...arr1].sort((a, b) => a.id.localeCompare(b.id))
  const arr2Sorted = [...arr2].sort((a, b) => a.id.localeCompare(b.id))

  return arr1Sorted.every((item, index) => item.id === arr2Sorted[index].id)
}

interface EnhancedTableProps {
  rows: Measure[]
  order: 'asc' | 'desc'
  orderBy: keyof Measure
  onSortChange: (newOrder: 'asc' | 'desc', newOrderBy: keyof Measure) => void
}

export default function EnhancedTable({
  rows,
  order,
  orderBy,
  onSortChange,
}: EnhancedTableProps) {
  const [selected, setSelected] = React.useState<readonly string[]>([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const previousRows = useRef<Measure[]>([])
  useEffect(() => {
    if (!arraysAreEqual(previousRows.current, rows)) {
      setSelected([])
      setPage(0)
      previousRows.current = rows
    }
  }, [rows])

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Measure
  ) => {
    const isAsc = orderBy === property && order === 'asc'
    onSortChange(isAsc ? 'desc' : 'asc', property)
  }

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id)
      setSelected(newSelected)
      return
    }
    setSelected([])
  }

  const downloadData = (format: 'csv' | 'json') => {
    const selectedData = rows.filter((row) => selected.includes(row.id))
    const sortedSelectedData = selectedData.sort(getComparator(order, orderBy))
    const data =
      format === 'csv' ? toCsv(sortedSelectedData) : toJson(sortedSelectedData)

    const blob = new Blob([data], { type: 'text/plain;charset=utf-8' })
    saveAs(blob, `data.${format}`)
  }

  const toCsv = (data: Measure[]) => {
    const header = Object.keys(data[0]).join(',')
    const csv = data.map((row) => Object.values(row).join(',')).join('\n')
    return `${header}\n${csv}`
  }

  const toJson = (data: Measure[]) => {
    return JSON.stringify(data, null, 2)
  }

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id)
    let newSelected: readonly string[] = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }
    setSelected(newSelected)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  const visibleRows = React.useMemo(
    () => [...rows].slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [page, rowsPerPage, rows]
  )

  return (
    <Box sx={{ width: '100%' }}>
      <div className='p-4 mb-6 bg-white rounded-lg shadow-md'>
        <EnhancedTableToolbar
          numSelected={selected.length}
          downloadData={downloadData}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby='tableTitle'
            size='medium'
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = selected.includes(row.id)
                const labelId = `enhanced-table-checkbox-${index}`

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role='checkbox'
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding='checkbox'>
                      <Checkbox
                        color='primary'
                        checked={isItemSelected}
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </TableCell>
                    <TableCell
                      component='th'
                      id={labelId}
                      scope='row'
                      padding='none'
                    >
                      {row.sensor_id}
                    </TableCell>
                    <TableCell align='right'>{row.value}</TableCell>
                    <TableCell align='right'>{row.timestamp}</TableCell>
                  </TableRow>
                )
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 15, 25]}
          component='div'
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
      <div className='p-4 mb-6 bg-white rounded-lg shadow-md'>
        <Visualization
          items={
            selected.length > 0
              ? rows.filter((row) => selected.includes(row.id))
              : rows
          }
        />
      </div>
    </Box>
  )
}
