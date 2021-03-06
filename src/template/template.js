module.exports = (initialState) => (
  `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="/bundle.css" rel="stylesheet">
        <title>FCC Voting App</title>
      </head>
      <body>
        <div id="root"></div>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.5/js/materialize.min.js"></script>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
          $(document).ready(function() {
            $('.button-collapse').sideNav();
          });
        </script>
        <script src="/bundle.js"></script>
      </body>
    </html>
  `
)
