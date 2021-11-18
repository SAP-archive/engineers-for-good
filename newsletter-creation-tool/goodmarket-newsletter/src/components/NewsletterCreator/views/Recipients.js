import Selector from "../../Selector/Selector"

const RecipientsView = (props) => {
    return (
        <Selector items={props.countries} setItems={props.setCountries}
        views={props.views}
        setCurrentView={props.setCurrentView}/>
    )
}

export default RecipientsView;