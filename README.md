# SSA (Sysacad Score Automation)

SSA is a Node.js API that automates fetching academic scores from the Sysacad system at the Universidad Tecnológica Nacional. It utilizes web scraping with Puppeteer to navigate the website, log in, extract student score information, and returns it in JSON format.

## Features

- **Task Automation**: Accesses the Sysacad system with provided credentials and extracts scores without manual intervention.
- **Security and Transparency**: No personal information is stored or stolen. You can review the [source code on GitHub](https://github.com/BasiliscX/sysacad-score-automation.git) to verify its operation.
- **Web Interface**: Includes a simple web interface to interact with the API via an HTML form on the main screen or through tools like Insomnia and Postman.

## Usage

### Web Interface

1. Access the [server's main page](https://sysacad-score-automation-production.up.railway.app).
2. Fill out the form with faculty number, registration number, and password to fetch scores.
![web-form](https://i.postimg.cc/BZNBFqZc/front-PR-junacadev.png)
![web-form-response](https://i.postimg.cc/bJYh8JQ1/web-form-response.png)
3. Alternatively, you can send a POST request to `https://sysacad-score-automation-production.up.railway.app/api/scores` using Insomnia, Postman, or similar tools.
![insomnia POST](https://i.postimg.cc/SNsGBp33/insomnia-POST-500.png)

### Local Usage

1. **Installation**: Clone this repository or download it directly. Ensure Node.js is installed.
2. **Configuration**: Set environment variables or adjust options as needed in the `server.js` file.
3. **Execution**: Start the server by running `npm start` in your terminal.

## Contribution

If you want to contribute to SSA, follow these steps:

1. Fork the repository and clone it to your local machine.
2. Create a branch (`git checkout -b feature/new-feature`).
3. Make your changes and test them.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature/new-feature`).
6. Open a pull request on GitHub.

## Acknowledgements

This project uses open-source technologies and thanks the developer community for their support and contributions.

## Contact

For any questions or suggestions, feel free to contact me through my [GitHub profile](https://github.com/BasiliscX).
