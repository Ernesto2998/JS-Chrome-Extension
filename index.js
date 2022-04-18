// function saveLead() {
//     console.log("Button clicked from a function!");
// }

// string to array      array to string
// JSON.parse("")       JSON.stringify()

// Prácticas innerHTML, createElement
// for ( let i = 0; i < myLeads.length; i++) {
//     // console.log( myLeads[ i ] );
//     ulEl.innerHTML += "<li>" + myLeads[ i ] + "</li>";      // 1ra forma innerHTML
//                                                             // 2da forma createElement
//     // const li = document.createElement( "li" );
//     // li.textContent = myLeads[ i ];
//     // ulEl.append( li );
// }
function renderLeads ( leads ) {
    let listItems = "";

    for ( let i = 0; i < leads.length; i++) {
        listItems += `
            <li> 
                <a href = "${ leads[ i ] }" target = "_blank" rel = "noopener noreferrer"> ${ leads[ i ] } </a>
            </li>
        `;
    }

    ulEl.innerHTML = listItems;
}

let myLeads = [];
const leadsFromLocalStorage = JSON.parse( localStorage.getItem( "myLeads" ) );
const inputEl = document.querySelector( 'input' );
const inputBtn = document.querySelector( "#input-btn" );
const tabBtn = document.querySelector( "#tab-btn" );
const deleteBtn = document.querySelector( "#delete-btn" );
const ulEl = document.querySelector( "#ul-el" );

if ( leadsFromLocalStorage ) {
    myLeads = leadsFromLocalStorage;
    renderLeads ( myLeads );
}

inputBtn.addEventListener( "click", function() {
    if ( inputEl.value != "" ) {
        myLeads.push( inputEl.value );
        inputEl.value = "";
        localStorage.setItem( "myLeads", JSON.stringify( myLeads ) );
        // localStorage.getItem( "myLeads" );
        // localStorage.clear();
        renderLeads ( myLeads );
    }
} )

deleteBtn.addEventListener( "dblclick", function() {
    localStorage.clear();
    myLeads = [];
    renderLeads ( myLeads );
} )

// Get de current tab 
tabBtn.addEventListener( "click", function() {
    chrome.tabs.query( { active: true, currentWindow: true }, function( tabs ) {
        myLeads.push( tabs[0].url );
        localStorage.setItem( "myLeads", JSON.stringify( myLeads ) );
        renderLeads ( myLeads );
    } )
} )