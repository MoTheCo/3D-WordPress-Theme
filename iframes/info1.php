<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Info</title>
    <style>
        .container {
            width: 100%;
            height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: white;
         
        }
        a {
            color: white; /* Style for links */
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Content will be inserted here by JavaScript -->
    </div>
    <script>
        var f = '/wp-content/plugins/3d/threejs-texts.json';
        fetch(f)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                var iframeTitle = document.createElement('h1');
                iframeTitle.innerHTML = data.iframe1_title;

                var iframeUrl = document.createElement('a');
                iframeUrl.href = data.iframe1_url;
                iframeUrl.innerHTML = "klicken Sie hier"; // More user-friendly text for the link
                iframeUrl.target = "_blank"; // Open the link in a new tab
                var container = document.querySelector('.container');
                container.appendChild(iframeTitle);
                container.appendChild(iframeUrl);
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
                var container = document.querySelector('.container');
                container.innerHTML = '<p>Error loading content.</p>'; // User-friendly error message
            });
    </script>
</body>
</html>
