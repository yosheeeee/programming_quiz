import './QuizMenu.scss'

export function QuizMenu(){
    return (
        <div className='menu_block'>
            <MenuItem quiz_ref='#' img_name='cs_logo.svg'/>
            <MenuItem quiz_ref='#' img_name='cpp_logo.svg'/>
            <div className="menu_item">3</div>
            <div className="menu_item">3</div>
            <div className="menu_item">3</div>
            <div className="menu_item">3</div>
        </div>
    )
}

interface MenuItemProps{
    img_name : string,
    quiz_ref : string
}

// cs_logo.svg
function MenuItem({img_name, quiz_ref} : MenuItemProps){
    return (
        <a href={quiz_ref} className="menu_item">
            <img src={`./img/${img_name}`}/>
        </a>
    )
}