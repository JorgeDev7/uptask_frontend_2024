import './spinnerStyles.css';
export default function Spinner() {
  return (
    <>
      <div className='flex flex-col justify-center items-center'>
        <div className="sk-chase">
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
        </div>
        <p className='mt-5 font-bold text-indigo-800'>Cargando</p>
      </div>
    </>
  );
}
