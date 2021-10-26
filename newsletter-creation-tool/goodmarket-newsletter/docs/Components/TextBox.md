# TextBox

Our react component `TextBox` is based on the `react-quill` component (https://github.com/zenoamaro/react-quill) with the `snow` theme.

It displays an editor with a field to enter your text and with a header, that contains a menu to format the text.

<img src="../images/editor-with-text.png" alt="alt text" width=40% height=40%>

### Menu options

In the menu you can format the selected text section with the following buttons and drop-downs:
* <img src="../images/font-size-drop-down.png" alt="alt text" width=7% height=7%> font size
* <img src="../images/bold-button.png" alt="alt text" width=2% height=2%> bold
* <img src="../images/italic-button.png" alt="alt text" width=2% height=2%> italic
* <img src="../images/underlined-button.png" alt="alt text" width=2% height=2%> underline
* <img src="../images/strike-through-button.png" alt="alt text" width=2% height=2%> strike through
* <img src="../images/block-quote-button.png" alt="alt text" width=2% height=2%> block quote
* <img src="../images/text-color-button.png" alt="alt text" width=2% height=2%> text color
* <img src="../images/background-color-button.png" alt="alt text" width=2% height=2%> background color
* <img src="../images/subscript-button.png" alt="alt text" width=2% height=2%> subscript
* <img src="../images/superscript-button.png" alt="alt text" width=2% height=2%> superscript
* <img src="../images/numbered-list-button.png" alt="alt text" width=2% height=2%> numbered list
* <img src="../images/bullet-points-button.png" alt="alt text" width=2% height=2%> bullet points
* <img src="../images/insert-link-button.png" alt="alt text" width=2% height=2%> insert link
* <img src="../images/remove-formatting-button.png" alt="alt text" width=2% height=2%> clean all formatting

which are defined in `modules.toolbar` and `formats` in the code.

## Usage
The `TextBox` component
```jsx
<TextBox
    textBoxContent={sampleContent}
    handleChange={handleSampleChange}
/>
```
uses [state hooks](https://reactjs.org/docs/hooks-state.html), e.g. `sampleContent` and `handleSampleChange` with and empty default state:
```jsx
const [sampleContent, handleSampleChange] = useState("");
```

You can handover a state (`textBoxContent`) and a function that update the state (`handleChange`) to the `TextBox` component. `sampleContent` would contain the current state of the text box's text field, i.e. what the user is entering. It contains html tags, but they are rendered inside the text box's text field.

We use the `TextBox` to enter intro and outro text to the newsletter:
```jsx
<TextBox
    textBoxContent={introContent}
    handleChange={handleIntroChange}
/>
...
<TextBox
    textBoxContent={outroContent}
    handleChange={handleOutroChange}
/>
```
`introContent` and `outroContent` are then used in the `Preview Newsletter` section when we render the whole html newsletter including the links to the spotlights, enterprises and marketplace listings.