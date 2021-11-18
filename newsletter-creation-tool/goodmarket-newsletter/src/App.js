import './App.css';
import NewsletterCreator from './components/NewsletterCreator/NewsletterCreator'
import React from "react";

class Main extends React.Component {

  constructor(props) {
    super(props)

    this.onSubjectChange = this.onSubjectChange.bind(this)
    this.onIntroChange = this.onIntroChange.bind(this)
    this.onOutroChange = this.onOutroChange.bind(this)

    this.state = {
      /** Contains the content entered in the subject text box */
      subjectContent: '',
      /** Contains the content entered in the into TextBox */
      introContent: '',
      /** Contains the content entered in the outro TextBox */
      outroContent: '',
    }
  }

/** Handles and logs changes to the subjectContent state */
onSubjectChange(content) {
  this.setState({subjectContent: content})
  console.log(content)
}

/** Handles and logs changes to the introContent state */
onIntroChange(content) {
  this.setState({introContent: content})
  console.log(content)
}

/** Handles and logs changes to the outroContent state */
onOutroChange(content) {
  this.setState({outroContent: content})
  console.log(content)
}


 render() {
   return(
     <NewsletterCreator />
 )}
}

function App() {
  return (
    <Main />
    );
}
export default App;
