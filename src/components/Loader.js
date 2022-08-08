function Loader({ isOpen }) {
  return (
    <div className={`loader ${isOpen && 'loader_active'}`}><div className='loader__spinner'></div></div>
  )
}

export default Loader;
