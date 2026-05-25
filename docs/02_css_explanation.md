# css/style.css — Line by Line Explanation

## What is this file?
This file controls the visual appearance of the chat app — layout, colors, sizing, and positioning of all elements.

---

## Full Code Breakdown

```css
.logo {
    display: block;
    width: 50px;
    height: 50px;
    margin: auto;
}
```
Styles the logo image in the navbar.
- `display: block` — images are inline by default; block allows `margin: auto` to center it.
- `width/height: 50px` — fixed size for the logo.
- `margin: auto` — centers it horizontally.

---

```css
.ChatApp {
    width: 6%;
    height: 50px;
    margin: auto;
}
```
Styles the "ChatApp" heading in the navbar.
- `width: 6%` — keeps the heading narrow so it doesn't stretch across the full page.
- `margin: auto` — centers it.

---

```css
.container {
    max-width: 955px;
    border: 2px solid black;
    margin: auto;
    height: 60vh;
    padding: 33px;
    overflow-y: auto;
    margin-bottom: 23px;
}
```
The main chat message box.
- `max-width: 955px` — limits width on large screens so it doesn't stretch too wide.
- `margin: auto` — centers the box horizontally.
- `height: 60vh` — takes up 60% of the viewport height.
- `padding: 33px` — inner spacing so messages don't touch the border.
- `overflow-y: auto` — adds a vertical scrollbar when messages overflow the box.
- `margin-bottom: 23px` — gap between the chat box and the input form below.

---

```css
.message {
    background-color: grey;
    width: 24%;
    padding: 10px;
    margin: 17px 12px;
    border: 2px solid black;
    border-radius: 12px;
}
```
Each individual chat message bubble.
- `background-color: grey` — all bubbles have a grey background.
- `width: 24%` — bubbles take up about a quarter of the container width.
- `padding: 10px` — space inside the bubble around the text.
- `margin: 17px 12px` — vertical and horizontal spacing between bubbles.
- `border-radius: 12px` — rounded corners for the bubble shape.

---

```css
.left {
    float: left;
    clear: both;
}
```
Applied to incoming messages (from other users).
- `float: left` — pushes the bubble to the left side.
- `clear: both` — ensures each message starts on a new line, not beside the previous one.

---

```css
.right {
    float: right;
    clear: both;
}
```
Applied to outgoing messages (your own messages).
- `float: right` — pushes the bubble to the right side, like WhatsApp/iMessage style.
- `clear: both` — same as above, prevents stacking side by side.

---

```css
#send-container {
    display: block;
    margin: auto;
    text-align: center;
    max-width: 985px;
    width: 100%;
}
```
The form that wraps the input and send button.
- `display: block` — makes it a block-level element.
- `text-align: center` — centers the input and button inside.
- `max-width: 985px` — aligns with the chat container width above.

---

```css
#messageInp {
    width: 92%;
    border: 2px solid black;
    border-radius: 6px;
    height: 34px;
}
```
The text input field.
- `width: 92%` — takes up most of the form width, leaving room for the Send button.
- `border-radius: 6px` — slightly rounded corners.
- `height: 34px` — fixed height for the input.

---

```css
.btn {
    cursor: pointer;
    border: 2px solid black;
    border-radius: 6px;
    height: 34px;
}
```
The Send button.
- `cursor: pointer` — shows a hand cursor on hover, indicating it's clickable.
- Matches the input height and border style for a consistent look.

---

```css
body {
    height: 100vh;
    background-image: linear-gradient(rgb(244, 238, 238), rgb(34, 44, 119));
}
```
The page background.
- `height: 100vh` — body fills the full viewport height.
- `linear-gradient(...)` — smooth gradient from a light pinkish-white at the top to a dark navy blue at the bottom.

---

## Interview Questions on CSS

**Q: What is the difference between `id` and `class` selectors in CSS?**
A: `#id` targets a single unique element. `.class` can target multiple elements. IDs have higher specificity.

**Q: What does `overflow-y: auto` do?**
A: Adds a vertical scrollbar only when the content overflows the element's height. `scroll` always shows it; `auto` shows it only when needed.

**Q: What is `vh` unit?**
A: Viewport Height. `1vh` = 1% of the browser window height. `100vh` = full screen height.

**Q: Why use `float` for message alignment instead of flexbox?**
A: This is an older approach. Flexbox or CSS Grid would be more modern. `float` works but requires `clear: both` to prevent layout issues.

**Q: What is `linear-gradient`?**
A: A CSS function that creates a smooth color transition between two or more colors in a straight line. Here it goes top to bottom from light to dark.

**Q: What does `max-width` do vs `width`?**
A: `width` sets a fixed size. `max-width` sets an upper limit — the element can be smaller on small screens but won't exceed that value on large screens.
