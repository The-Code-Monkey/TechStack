const Toolbar = () => {
  return (
    <div id='toolbar'>
      <span className='ql-formats'>
        <select className='ql-header'>
          <option value='1'></option>
          <option value='2'></option>
          <option value='3'></option>
        </select>
      </span>
      <span className='ql-formats'>
        <button type='button' className='ql-bold'></button>
        <button type='button' className='ql-italic'></button>
        <button type='button' className='ql-underline'></button>
        <button type='button' className='ql-link'></button>
      </span>
      <span className='ql-formats'>
        <button type='button' className='ql-list' value='ordered'></button>
        <button type='button' className='ql-list' value='bullet'></button>
      </span>
      <span className='ql-formats'>
        <button type='button' id='insert-table'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='feather feather-table'
          >
            <path d='M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18'></path>
          </svg>
        </button>
      </span>
    </div>
  );
};

export default Toolbar;
