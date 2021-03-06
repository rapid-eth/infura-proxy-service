/* --- Global --- */
import {Table} from '@horizin/molecules';
import {shortenAddress, shortenHash} from '@src/utilities';
/* --- Local --- */

/* --- Component --- */
const TransactionTable = ({data}) => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Core',
        columns: [
          {
            Header: 'Hash',
            accessor: d => shortenHash(d.hash, 10),
          },
          {
            Header: 'Parent Hash',
            accessor: d => shortenHash(d.parentHash, 10),
          },
        ],
      },
      {
        Header: 'Exta',
        columns: [
          {
            Header: 'Miner',
            accessor: d => shortenAddress(d.miner, 10),
          },
          {
            Header: 'Difficulty',
            accessor: 'difficulty',
          },
          {
            Header: 'Timestamp',
            accessor: 'timestamp',
          },
        ],
      },
    ],
    [],
  );

  return (
    <>
      <Table
        columns={columns}
        data={data}
        sx={{
          border: '1px solid',
          borderColor: 'gray',
          width: '100%',
          // ...sx,
        }}
        sxHeader={{
          borderBottom: '2px solid ',
          borderBottomColor: 'gray',
          color: 'charcoal',
          py: 3,
        }}
        sxCell={{
          borderRight: '1px solid',
          borderRightColor: 'gray',
          p: 3,
        }}
        sxRow={{
          borderBottom: '1px solid ',
          borderBottomColor: 'gray',
          '&:hover': {
            bg: 'smoke',
          },
        }}
      />
    </>
  );
};
export default TransactionTable;
