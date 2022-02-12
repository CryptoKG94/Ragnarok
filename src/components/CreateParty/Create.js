import React from 'react'

const Create = () => {
  return (
    <div>
      <div className='main_header'>
        <div className='char'>
          <h4>Charactor</h4>
        </div>
        <div className='party'>
          <h4>Party</h4>
        </div>
      </div>
      <table className='main_table mt-2' cellPadding={5}>
        <thead>
          <tr className='table_header '>
            <th className='class' scope="col"><div className='clas_pad'>Classes</div></th>
            <th scope="col"><div className='clas_pad'>Level</div></th>
            <th scope="col"><div className='clas_pad'>Gender</div></th>
            <th scope="col"><div className='clas_pad'>Upper</div></th>
            <th scope="col"><div className='clas_pad'>Mid</div></th>
            <th scope="col"><div className='clas_pad'>Lower</div></th>
          </tr>
        </thead>
      </table>


      <table className='mt-3 container' cellPadding={10} >
        <tbody>
          <tr className='table_header '>
            <div>
              <th><div className='suare'></div></th>
              <th><div className='suare'></div></th>
              <th><div className='suare'></div></th>
              <th><div className='suare'></div></th>
              <th><div className='suare'></div></th>
              <th><div className='suare'></div></th>
              <th><div className='suare'></div></th>
              <th><div className='suare'></div></th>
              <th><div className='suare'></div></th>
            </div>
            <div>
              <th><div className='suare'></div></th>
              <th><div className='suare'></div></th>
              <th><div className='suare'></div></th>
              <th><div className='suare'></div></th>
              <th><div className='suare'></div></th>
              <th><div className='suare'></div></th>
              <th><div className='suare'></div></th>
              <th><div className='suare'></div></th>
              <th><div className='suare'></div></th>
            </div>
            <div>
              <th><div className='suare'></div></th>
              <th><div className='suare'></div></th>
              <th><div className='suare'></div></th>
              <th><div className='suare'></div></th>
              <th><div className='suare'></div></th>
              <th><div className='suare'></div></th>
              <th><div className='suare'></div></th>
              <th><div className='suare'></div></th>
              <th><div className='suare'></div></th>
            </div>
            <div>
              <th><div className='suare'></div></th>
              <th><div className='suare'></div></th>
              <th><div className='suare'></div></th>
              <th><div className='suare'></div></th>
              <th><div className='suare'></div></th>
              <th><div className='suare'></div></th>
              <th><div className='suare'></div></th>
              <th><div className='suare'></div></th>
              <th><div className='suare'></div></th>
            </div>
          </tr>
        </tbody>
      </table>



    </div>
  )
}

export default Create