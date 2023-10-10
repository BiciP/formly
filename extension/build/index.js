var g=`<div class="formly-container">
  <div class="formly-form">
    <p>Tell us more about yourself</p>
    <p>We would like to learn more about you so we can make the product better</p>
    <button>Take the 20 second survey</button>
    <button>Skip</button>
  </div>
  <button class="formly-bubble">
    ?
  </button>
</div>`;var f=`:root {
  --shadow-color: 0deg 0% 63%;
  --shadow-elevation-low:
    0.3px 0.5px 0.6px hsl(var(--shadow-color) / 0.48),
    0.4px 0.8px 0.9px -1.7px hsl(var(--shadow-color) / 0.39),
    1px 2px 2.2px -3.5px hsl(var(--shadow-color) / 0.3);
  --shadow-elevation-medium:
    0.3px 0.5px 0.6px hsl(var(--shadow-color) / 0.4),
    0.5px 1px 1.1px -0.9px hsl(var(--shadow-color) / 0.36),
    1.1px 2.2px 2.4px -1.7px hsl(var(--shadow-color) / 0.31),
    2.5px 4.9px 5.4px -2.6px hsl(var(--shadow-color) / 0.27),
    5px 10px 10.9px -3.5px hsl(var(--shadow-color) / 0.22);
  --shadow-elevation-high:
    0.3px 0.5px 0.6px hsl(var(--shadow-color) / 0.38),
    0.8px 1.7px 1.8px -0.4px hsl(var(--shadow-color) / 0.35),
    1.5px 3px 3.3px -0.8px hsl(var(--shadow-color) / 0.33),
    2.4px 4.8px 5.2px -1.2px hsl(var(--shadow-color) / 0.31),
    3.8px 7.6px 8.3px -1.6px hsl(var(--shadow-color) / 0.29),
    5.9px 11.7px 12.8px -1.9px hsl(var(--shadow-color) / 0.27),
    8.8px 17.6px 19.2px -2.3px hsl(var(--shadow-color) / 0.25),
    12.9px 25.7px 28px -2.7px hsl(var(--shadow-color) / 0.23),
    18.2px 36.4px 39.7px -3.1px hsl(var(--shadow-color) / 0.2),
    25px 50px 54.5px -3.5px hsl(var(--shadow-color) / 0.18);
}

.formly-wrapper * {
  /* all: unset; TODO: figure out how to do this better */
  margin: 0;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.formly-wrapper button {
  border: none;
  text-align: center;
}

.formly-wrapper {
  position: fixed;
  bottom: 8px;
  right: 8px;
}

.formly-wrapper button.formly-bubble {
  border-radius: 100%;
  width: 44px;
  height: 44px;
  background-color: #ffffff;
  border: 1px solid #f0f0f0;
  color: black;
  box-shadow: var(--shadow-elevation-medium);
}

.formly-bubble:hover {
  cursor: pointer;
}

.formly-form {
  position: absolute;
  width: fit-content;
  background-color: #ffffff;
  border: 1px solid #f0f0f0;
  bottom: 52px;
  right: 0;
  padding: 12px 16px;
  border-radius: 6px;
  box-shadow: var(--shadow-elevation-medium);
  font-size: 14px;
}

.formly-form p:first-child {
  font-weight: bold;
  white-space: nowrap;
}

.formly-form button {
  background-color: blue;
  width: 100%;
}

.formly-form button:last-child {
  background-color: transparent;
}`;var b=function(x){let c={eventName:x,origin:location.origin},o=new XMLHttpRequest;o.open("POST","http://localhost:3000",!0),o.setRequestHeader("Content-Type","text/plain"),o.send(JSON.stringify(c)),o.onreadystatechange=function(){if(o.readyState===4)console.log("request.readyState === 4")}},d=function(){document.querySelector(".formly-wrapper button.formly-bubble")?.addEventListener("click",()=>{console.log("click")})};(function(){const x=document.createElement("div");x.className="formly-wrapper",x.innerHTML=g;const c=document.createElement("style");c.innerHTML=f,document.head.appendChild(c),document.body.appendChild(x),d(),b("load")})();
