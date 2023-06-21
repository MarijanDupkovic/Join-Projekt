/** Adds a legal notice section to the webpage. */
function addLegalNotice() {
    
    let reference = document.location.href;
    if(reference.includes('summary.html')) document.getElementById('showSummary').style = '';
    else if (reference.includes('board.html')) document.getElementById('showBoard').style = '';
    else if (reference.includes('addTask.html')) document.getElementById('showAddTask').style = '';
    else if (reference.includes('contacts.html')) document.getElementById('showContacts').style = '';
    if(isElementExistent('legalNotice')) removeID('legalNotice');
    document.body.innerHTML += `
    <div class="legalNotice content" id="legalNotice">
        <a class="back" onclick="removeID('legalNotice');resetStyleOfSelectedPage('${reference}')"><img src="../img/backIconBlack.png" class="backImg"></a>
        <div class="noticeContainer">
            <div class='impressum'>
                <h1>Impressum</h1><br>
                <p>Angaben gemäß § 5 TMG</p><br>
                <p>Marijan Dupkovic<br>
                    Königsbergerstr. 65<br>
                    21465 Reinbek <br>
                </p><br>
                <p><strong>Vertreten durch: </strong><br><br>
                    Marijan Dupkovic<br>
                </p><br>
                <p><strong>Kontakt:</strong> <br><br>
                    E-Mail: <a style="color:blue;" href='mailto:m.dupkovic@gmail.com'>m.dupkovic@gmail.com</a></br>
                </p><br>
                <p><strong>Haftungsausschluss: </strong><br><br><strong>Haftung für Inhalte</strong><br><br>
                    Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
                    Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als
                    Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den
                    allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
                    verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen
                    zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder
                    Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine
                    diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten
                    Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese
                    Inhalte umgehend entfernen.<br><br><strong>Urheberrecht</strong><br><br>
                    Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem
                    deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung
                    außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors
                    bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen
                    Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden
                    die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet.
                    Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen
                    entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte
                    umgehend entfernen.<br><br><strong>Datenschutz</strong><br><br>
                    Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit
                    auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder eMail-Adressen)
                    erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis. Diese Daten werden ohne
                    Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben. <br>
                    Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail)
                    Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist
                    nicht möglich. <br>
                    Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten durch Dritte zur
                    Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit
                    ausdrücklich widersprochen. Die Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte
                    im Falle der unverlangten Zusendung von Werbeinformationen, etwa durch Spam-Mails, vor.<br>
                </p><br>
                Website Impressum von <a style="color:blue;" href="https://www.impressum-generator.de">impressum-generator.de</a>
            </div>
        </div>
    </div>`;
}

function resetStyleOfSelectedPage(reference){
    setStyleOfLegalNotice('');
    if(reference.includes('summary.html')) document.getElementById('showSummary').style = 'background:#091931;';
    else if (reference.includes('board.html')) document.getElementById('showBoard').style = 'background:#091931;';
    else if (reference.includes('addTask.html')) document.getElementById('showAddTask').style = 'background:#091931;';
    else if (reference.includes('contacts.html')) document.getElementById('showContacts').style = 'background:#091931;';
}

/** Adds a help section to the webpage. */
function addHelp() {
    if(isElementExistent('helpContent')) removeID('helpContent');
    document.body.innerHTML += `
    <div class="help content" id="helpContent">
        <a class="back" onclick="removeID('helpContent')"><img src="../img/backIconBlack.png" class="backImg"></a>
        <div class="helpContainer">
            <h2 class="helpHeader">Help</h2>
            <div class="helpDescriptionContainer">
                <h3>What is Join?</h3>
                <p>Join is a project management tool that includes a kanban system, enabling team collaboration and task management.<br>With Join, your team can easily track tasks assigned to each team member, view their progress, and identify completed tasks. The intuitive drag and drop functionality makes it simple to move task cards across different stages.<br>Join is a valuable tool that supports your daily work.</p>
                <h3>How to use it</h3>
                <div class="howToContainer">
                    <div class="howToNumbersAndTextContainer">
                        <div class="howToNumbers">1.</div> 
                        <div class="howToText">Click on the "Create Task" button and fill in the required fields such as title, description, category, date, and priority.<br>You can assign tasks to existing team members from your contacts or add new contacts through the "Contacts" menu.</div>
                    </div>
                    <div class="howToNumbersAndTextContainer">
                        <div class="howToNumbers">2.</div> 
                        <div class="howToText">Access the "Board" menu to view the added tasks. This is where the kanban system comes into play.<br>Use drag and drop to move task cards into the appropriate columns, such as "To Do," "In Progress," "Awaiting Feedback," or "Done."</div>
                    </div>
                    <div class="howToNumbersAndTextContainer">
                        <div class="howToNumbers">3.</div> 
                        <div class="howToText">The "Summary" menu provides an overview of all tasks.<br>You can quickly identify tasks in progress and those with approaching deadlines, which is crucial for urgent tasks. Additionally, you can easily track completed tasks.</div>
                    </div>
                    <div class="howToNumbersAndTextContainer">
                        <div class="howToNumbers">4.</div> 
                        <div class="howToText">In the "Contacts" section, you can invite new contacts and manage existing ones.<br>Invite team members by entering their contact information and sending them an invitation to join your project. You can also manage your contacts by editing their details or removing them when necessary. This allows you to maintain an organized and up-to-date contact list for efficient collaboration within your team.</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;
}