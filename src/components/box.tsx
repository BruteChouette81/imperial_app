
import "./css/box.css"

interface ContainerProps {
    name: string;
    info: string;
    link: string;
}

const Box: React.FC<ContainerProps> = ({ name, info, link}) => {
    return(
        <div className="box">
            <h2>{name}</h2>
            <p>{info}</p>
            <a target="_blank" rel="noopener noreferrer" href={link}>More...</a>


        </div>
    )
}

export default Box;