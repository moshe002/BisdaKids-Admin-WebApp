import React from 'react'
import { AiOutlineDownload } from 'react-icons/ai'
import { DownloadTableExcel  } from 'react-export-table-to-excel' // gamit rakog package gkan npm

function DownloadAsFile({ tableData, text }) {

    // const { downloadTableData } = useDownloadExcel({
    //     currentTableRef: tableData,
    //     filename: 'Game Transactions',
    //     sheet: 'GameTransactions'
    // })

  return (
    <>
        <DownloadTableExcel
            filename={text}
            sheet={text}
            currentTableRef={tableData}>
            <button 
                className='p-2 rounded-full text-xl bg-green-400' 
                type='button' 
                title='Download as Excel File'
                //onClick={downloadTableData}
                >
                    <AiOutlineDownload/>
            </button>
        </DownloadTableExcel>
    </>
  )
}

export default DownloadAsFile