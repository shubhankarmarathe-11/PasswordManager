import './Flash.css'

type param = {
    text :string,
    color :string,
    bgcolor :string
}


const Flash = ({text,color,bgcolor}:param) => {
  return (
    <div className='flashdiv' style={{color:color,backgroundColor:bgcolor}}>
        <p>{text}</p>
    </div>
  )
}

export {Flash}
