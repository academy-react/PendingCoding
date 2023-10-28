
// eslint-disable-next-line react/prop-types
const ContactItems = ({src , title , desc}) => {
  return (
    <div className="h-[44px] flex mb-[80px]">
        <img src={src} />
        <div className="flex flex-col m-[0_10px_0_0]">
            <p className="text-[#505050] text-[15px]"> {title} </p>
            <p className="text-[#A4A4A4] text-[14px]"> {desc} </p>
        </div>
    </div>
  )
}

export { ContactItems } 