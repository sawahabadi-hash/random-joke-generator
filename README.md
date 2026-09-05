# 😂 Random Joke Generator

A fun and interactive web application that fetches random jokes and facts from multiple public APIs. Perfect for brightening your day with some laughs!

## ✨ Features

- **Multiple API Sources**:
  - 👨‍🦱 **Dad Jokes** - Classic dad jokes
  - 🧠 **Jeopardy Facts** - Fun trivia questions and answers
  - 💡 **Useless Facts** - Interesting but useless facts
  - 💬 **Advice** - Random advice slips

- **User-Friendly Interface**:
  - Clean, modern UI with smooth animations
  - One-click joke generation
  - Switch between different API sources
  - Share jokes via Web Share API or copy to clipboard

- **Joke History**:
  - Automatically saves last 10 jokes
  - Local storage persistence
  - Click on history items to display them again
  - Clear history button

- **Responsive Design**:
  - Works on desktop, tablet, and mobile devices
  - Beautiful gradient backgrounds
  - Smooth animations and transitions

## 🚀 Quick Start

1. Clone or download this repository
2. Open `index.html` in your web browser
3. Click "Get Random Joke" to fetch a joke
4. Use "Choose API" to switch between different sources
5. Share jokes with friends using the "Share Joke" button

## 🔌 APIs Used

### Dad Jokes API
- **URL**: `https://api.api-ninjas.com/v1/dadjokes`
- **Description**: Clean, family-friendly dad jokes
- **Response**: JSON with `joke` field

### Jeopardy API (Jservice)
- **URL**: `https://jservice.io/api/random`
- **Description**: Random Jeopardy questions and answers
- **Response**: JSON array with `question` and `answer` fields

### Useless Facts API
- **URL**: `https://uselessfacts.jsondatabase.com/random`
- **Description**: Random fun but useless facts
- **Response**: JSON with `text` field

### Advice Slip API
- **URL**: `https://api.adviceslip.com/advice`
- **Description**: Random advice and wisdom
- **Response**: JSON with `slip.advice` field

## 📁 Project Structure

```
random-joke-generator/
├── index.html       # Main HTML file
├── style.css        # Styling and animations
├── script.js        # Logic and API calls
└── README.md        # Documentation
```

## 💻 Technologies Used

- **HTML5** - Structure
- **CSS3** - Styling with Flexbox, Grid, and animations
- **Vanilla JavaScript** - No dependencies!
- **Fetch API** - For making API calls
- **LocalStorage** - For saving joke history
- **Web Share API** - For sharing functionality

## 🎨 Customization

You can easily:
- Add more joke APIs by updating the `apis` object in `script.js`
- Change colors and styling in `style.css`
- Modify the history limit (currently 10)
- Add additional features like filtering or searching

## 🛠️ Adding More APIs

To add a new API source:

```javascript
'your-api-name': {
    url: 'https://api.example.com/endpoint',
    headers: { 'Authorization': 'Bearer token' }, // if needed
    parseResponse: (data) => data.content, // extract joke/fact text
    name: '🎯 Your API Name'
}
```

Then add a radio button in the HTML API selector.

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## ⚠️ Notes

- Some APIs may have rate limiting - be reasonable with requests
- Internet connection required to fetch jokes
- History is stored locally in your browser
- No backend server needed - fully client-side!

## 📝 License

MIT License - Feel free to use this project for any purpose.

## 🤝 Contributing

Feel free to fork this project and add:
- More joke APIs
- Additional features (favorites, categories, etc.)
- Better UI/UX improvements
- Dark mode
- Translations

---

**Made with ❤️ for spreading laughs worldwide!**

**Get a joke and share the laugh! 😂**