import React, { useState } from 'react';
import { useTable } from 'react-table';
import './NewsletterHistory.css';
import PreviewIframe from "./PreviewIframe";
import PopUp from "../../PopUp/PopUp";

/**
 * View for newsletter history. This is a mock.
 */
function NewsletterHistory() {

  const [showPopupHtml, setShowPopupHtml] = useState(false);
  const [htmlContent, sethtmlContent] = useState("");

  function showNewsletterPopup() {
    setShowPopupHtml(true)
  }
  function togglePopupCancel() {
    setShowPopupHtml(false);
  }

   function fetchHtml() {
      fetch("templates/goodmarket_gm_style.html").then(response => response.text()).then(text => sethtmlContent(text));
     return htmlContent;
}

  const showHTML = () => {
    if (showPopupHtml) {
      return (
        <div>
          <div style={{backgroundColor:'#ccc'}}>
            <button style ={{marginTop:'20px',marginBottom:'20px'}} onClick={() => togglePopupCancel()}>Close</button>
          </div>
          <PreviewIframe
              innerHtml={fetchHtml()}
          />
        </div>
      )
    }
  }


  const data = React.useMemo(
    () => [
      {
        sentDate: '20/10/2021',
        sentTo: 'India, Germany',
        button: <button onClick={() => showNewsletterPopup()}>See Newsletter</button>,
      },
      {
        sentDate: '12/05/2020',
        sentTo: 'Germany, Sri Lanka',
        button: <button  onClick={() => showNewsletterPopup()}>See Newsletter</button>,
      },
      {
        sentDate: '12/05/2020',
        sentTo: 'Australia, Canada',
        button: <button>See Newsletter</button>,
      },
      {
        sentDate: '12/05/2020',
        sentTo: 'Australia, Canada',
        button: <button>See Newsletter</button>,
      },
      {
        sentDate: '12/05/2020',
        sentTo: 'Australia, Canada',
        button: <button>See Newsletter</button>,
      },
      {
        sentDate: '12/05/2020',
        sentTo: 'Australia, Canada',
        button: <button>See Newsletter</button>,
      },
      {
        sentDate: '12/05/2020',
        sentTo: 'Australia, Canada',
        button: <button>See Newsletter</button>,
      },
      {
        sentDate: '12/05/2020',
        sentTo: 'Australia, Canada',
        button: <button  onClick={() => showNewsletterPopup()}>See Newsletter</button>,
      }
    ],
    []
  )

  const columns = React.useMemo(
    () => [
      {
        Header: 'Sent Date',
        accessor: 'sentDate',
      },
      {
        Header: 'To',
        accessor: 'sentTo',
      },
      {
        Header: 'Actions',
        accessor: 'button', // accessor is the "key" in the data
      },
    ],
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data })


  return (
    <div>
      <div>
        <table className="newsletterHistory-table" {...getTableProps()} >
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th
                    {...column.getHeaderProps()}
                  >
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <td
                        {...cell.getCellProps()}
                      >
                        {cell.render('Cell')}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table >
      </div >
      <PopUp
    showPopUp={showPopupHtml}
    setShowPopUp={setShowPopupHtml}
    additionalClassInner="preview_popup"
    additionalClassPopUp="preview_popup"
    fetchInnerHtml={showHTML}
    />
    </div>

  );
}

export default NewsletterHistory;
