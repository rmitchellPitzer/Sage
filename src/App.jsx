import { useState, useEffect, useRef } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import PlayIcon from "./components/PlayIcon";
import PauseIcon from "./components/PauseIcon";
import ToggleIcon from "./components/ToggleIcon";
import DeleteIcon from "./components/DeleteIcon";
import { exists, writeTextFile, readTextFile, BaseDirectory } from '@tauri-apps/api/fs';
import { isPermissionGranted, requestPermission, sendNotification } from '@tauri-apps/api/notification';




function App() {






  


  async function updateSectionstate(){
    handleOnFocus()
    const subReddit = document.getElementById('subredditText').value
    const searchTerm = document.getElementById('searchTermText').value
    let newSearches = searches
    let newSubreddits = subreddits
    newSearches[isSearchSelected] = searchTerm
    newSubreddits[isSearchSelected] = subReddit
    setSearches(newSearches)
    setSubreddits(newSubreddits)
    let newBackend = backendState.split("\n");
    newBackend[isSearchSelected] = subReddit;
    newBackend[isSearchSelected + 3] = searchTerm;
    newBackend[isSearchSelected + 6] = Date.now().toString().substring(0,10);
    newBackend = newBackend.join('\n')
    setBackendState(newBackend);
    await writeTextFile('config.txt', newBackend, { dir: BaseDirectory.Home });


    setIsSearchSeleted(-1)
  }


  async function updateEntry1(){
    let newBackend = backendState.split("\n");
    newBackend[9] = newTracking.toString();
    newBackend = newBackend.join('\n')
    setBackendState(newBackend);
    await writeTextFile('config.txt', newBackend, { dir: BaseDirectory.Home });
  }









  function resetSectionState(){
    const subReddit = ''
    const searchTerm = ''
    let newSearches = searches
    let newSubreddits = subreddits
    newSearches[isSearchSelected] = searchTerm
    newSubreddits[isSearchSelected] = subReddit
    setSearches(newSearches)
    setSubreddits(newSubreddits)

    if (isSearchSelected == 0){
      setIcon1("")
    }
    else if (isSearchSelected == 1){
      setIcon2("")
    }
    else {
      setIcon3("")
    }


    setIsSearchSeleted(-1)
  }







  function SearchIcon(props){
    if (isSearchSelected == 0){
      return(
        <img src={icon1} key={icon1} className="editContainerIcon"/>
      )
    }
    else if (isSearchSelected == 1){
      return(
        <img src={icon2} key={icon2} className="editContainerIcon"/>
      )
    }
    else {
    return(
        <img src={icon3} key={icon3} className="editContainerIcon"/>
      )
    }
    
  }








  function handleOnFocus(){
    let subredditName = document.getElementById('subredditText').value;

    let requestURL = 'https://www.reddit.com/r/' + subredditName + ".json?sr_detail=1"

    function getUrl(){
        fetch(requestURL).then(function (response) {
            return response.json();}).then(function (data) {
            let imageURL = data["data"]["children"][0]["data"]["sr_detail"]["community_icon"]
            let index = imageURL.indexOf("?width");
            let newIconUrl = imageURL.substring(0, index);
            if (isSearchSelected == 0){
              setIcon1(newIconUrl)
            }
            else if (isSearchSelected == 1){
              setIcon2(newIconUrl)
            }
            else {
              setIcon3(newIconUrl)
            }
          }).catch(function (err) {
            // There was an error
            console.warn('Something went wrong.', err);});
      
    }
    getUrl()}


    async function updateTheme(){
      const newTheme = !theme;
      setTheme(newTheme);
      let newBackend = backendState.split("\n");
      newBackend[11] = newTheme.toString();
      newBackend = newBackend.join('\n')
      setBackendState(newBackend);
      await writeTextFile('config.txt', newBackend, { dir: BaseDirectory.Home });
    }



    async function updateNotifications(){
      const newNotifications= !NotificationsOn;
      setNotificationsOn(newNotifications);
      let newBackend = backendState.split("\n");
      newBackend[10] = newNotifications.toString();
      newBackend = newBackend.join('\n')
      setBackendState(newBackend);
      await writeTextFile('config.txt', newBackend, { dir: BaseDirectory.Home });
    }

    async function updateTracking(){
      const newTracking = !TrackingOn;
      setTracking(newTracking);
      let newBackend = backendState.split("\n");
      newBackend[9] = newTracking.toString();
      newBackend = newBackend.join('\n')
      setBackendState(newBackend);
      await writeTextFile('config.txt', newBackend, { dir: BaseDirectory.Home });
    }





  

  







 

  const [searches, setSearches] = useState(["", "", ""])
  const [subreddits, setSubreddits] = useState(["", "", ""])

  const [icon1, setIcon1] = useState("")
  const [icon2, setIcon2] = useState("")
  const [icon3, setIcon3] = useState("")
  const [theme, setTheme] = useState(true)
  const [TrackingOn, setTracking] = useState(true);
  const [NotificationsOn, setNotificationsOn] = useState(true);
  const [isSearchSelected, setIsSearchSeleted] = useState(-1);
  const [onStartup, setOnStartup] = useState(true);
  const [backendState, setBackendState] = useState('\n\n\n\n\n\n\n\n\n\n\n')
  const [items, setItems] = useState([])


  const Headings = () => {
    const headings = items.map((content)=>
      <div>
      <a id={theme? "" : "whiteColor"} className="posting" target="_blank" rel="noopener noreferrer" href={content[0]} key={content}>{content[1]}</a>
      <div className="spacing"></div>
      </div>)
    return <header>{headings}</header>
  }



  // Gets the contents from the config file
  async function getContets(){
    const contents = await readTextFile('config.txt', { dir: BaseDirectory.Home });
    return contents
  }



  // Writes anything you've passed into args.
  async function updateText(args){
    await writeTextFile('config.txt', args, 
    { dir: BaseDirectory.Home });
  }


  // Runs on startup, needs to be async to do a lot of weird react state change stuff
  async function startUp(){
    






    setOnStartup(false);
    // If the config file doesn't exist, create it. Defaults are tracking on/notifications on/light mode
    if (!(await exists('config.txt', { dir: BaseDirectory.Home }))){
      await writeTextFile('config.txt', '\n\n\n\n\n\n\n\n\ntrue\ntrue\ntrue', 
      { dir: BaseDirectory.Home });

      // 0-2, subreddits, 3-5, search terms, 6-8 timestamps, 9-11 tracking notifications theme
    } 


    // Needs a promise to get information from file, which can then be written to the state.
    const callAsync = new Promise((resolve, reject) => {
      resolve(getContets());})

    callAsync.then( (value) => 
      {setBackendState(value);
        updateText(value)
        let splitArr = value
        splitArr = splitArr.split("\n")
        setTracking(splitArr[9] == 'true')
        setNotificationsOn(splitArr[10] == 'true')
        setTheme(splitArr[11] == 'true')
        setSubreddits([splitArr[0], splitArr[1], splitArr[2]])
        setSearches([splitArr[3], splitArr[4], splitArr[5]])
        getIconUrl(splitArr[0]).then( response => setIcon1(response))
        getIconUrl(splitArr[1]).then( response => setIcon2(response))
        getIconUrl(splitArr[2]).then( response => setIcon3(response))
      }
      )
  }

  // let requestURL = 'https://www.reddit.com/r/' + subredditName + ".json?sr_detail=1"

    function getIconUrl(subredditName){
      let requestURL = 'https://www.reddit.com/r/' + subredditName + ".json?sr_detail=1"
      let iconURL = ''
      return fetch(requestURL).then(function (response) {
          return response.json();}).then(function (data) {
          let imageURL = data["data"]["children"][0]["data"]["sr_detail"]["community_icon"]
          let index = imageURL.indexOf("?width");
          let newIconUrl = imageURL.substring(0, index);
          return newIconUrl
        }).catch(function (err) {
          // There was an error
          console.warn('Something went wrong.', err);}); 
        }





  const [seconds, setSeconds] = useState(0);
  const timerId = useRef();


  if (onStartup){
    startUp()
    timerId.current = setInterval( () => {
      // renders.current++;
      setSeconds(prev => prev + 1)
  }, 1000);
  }


  if (seconds == 60){
    if (TrackingOn){
      let timestamp1 = backendState.split("\n")[6]
      let timestamp2 = backendState.split("\n")[7]
      let timestamp3 = backendState.split("\n")[8]
      let titlesAndUrls = []
      makeQuery(subreddits[0], searches[0]).then( (dataReceived) => 
      {
        let newBackendState = backendState;
        let splitBackend = newBackendState.split("\n");
        if (dataReceived[0] > splitBackend[6]){
          timestamp1 = dataReceived[0];
          titlesAndUrls.push([dataReceived[2], dataReceived[1]])
          if (NotificationsOn){
            let notificationTitle = 'New ' + searches[0] + ' post in ' + subreddits[0]
            let notificationBody = dataReceived[2]
            sendNotification({ title: notificationTitle, body: notificationBody });
          }
        } 
      }
      ).then( () => 
      makeQuery(subreddits[1], searches[1]).then( (dataReceived) => 
      {
        let newBackendState = backendState;
        let splitBackend = newBackendState.split("\n");
        if (dataReceived[0] > splitBackend[7]){
          timestamp2 = dataReceived[0];
          titlesAndUrls.push([dataReceived[2], dataReceived[1]])

          if (NotificationsOn){
            let notificationTitle = 'New ' + searches[1] + ' post in ' + subreddits[1]
            let notificationBody = dataReceived[2]
            sendNotification({ title: notificationTitle, body: notificationBody });
          }       
        } 
      }
      ).then( () => 
      makeQuery(subreddits[2], searches[2]).then( (dataReceived) => 
      {
        let newBackendState = backendState;
        let splitBackend = newBackendState.split("\n");
        if (dataReceived[0] > splitBackend[8]){
          timestamp3 = dataReceived[0];
          titlesAndUrls.push([dataReceived[2], dataReceived[1]])

          if (NotificationsOn){
            let notificationTitle = 'New ' + searches[2] + ' post in ' + subreddits[2]
            let notificationBody = dataReceived[2]
            sendNotification({ title: notificationTitle, body: notificationBody });
          }
        } 
      }))).then( () => {
        let newBackendState = backendState;
        let splitBackend = newBackendState.split("\n");
        splitBackend[6] = timestamp1
        splitBackend[7] = timestamp2
        splitBackend[8] = timestamp3

        if (titlesAndUrls.length > 0){
          let newItems = items
          newItems = titlesAndUrls.concat(newItems)
          setItems(newItems);
        }

        let newStateString = splitBackend.join("\n")
        setBackendState(newStateString);
        updateText(newStateString);
      });}
    setSeconds(0)
  }


  function makeQuery(subredditName, searchTerm){
    if (subredditName !== "" && searchTerm !== ""){
      let requestURL = 'https://www.reddit.com/r/' + subredditName + "/search.json?q=" + searchTerm.replaceAll(" ", "%20") + "&restrict_sr=on&sort=new&t=all";
    return fetch(requestURL).then(function (response) {
        return response.json();}).then(function (data) {
        let timestamp = data["data"]["children"][0]['data']['created']
        let title = data["data"]["children"][0]['data']['title']
        let url = data["data"]["children"][0]['data']['url']
        return [timestamp, title, url]
      }).catch(function (err) {
        // There was an error
        console.warn('Something went wrong.', err);}); 
      }
    }
  





  return (
    <div id={theme ? "container" : "darkBackground"} className="container">
      <div className="leftSide">
        <div className="currentlyTrackingText">Currently Tracking</div>
        { isSearchSelected < 0 ? <div id={theme ? "itemContainer" : "lightGreen"} className="itemContainer">
          <div className="trackingItems">



            {searches[0] == "" && subreddits[0] == "" ? 

            <div onClick={() => setIsSearchSeleted(0)} id={theme? "normal": "darkGreen"} className="trackingItemEmpty">
              <div className="trackingIcon"></div>
              <div>{"Click to edit tracking"}</div>
            </div>
            
            
            : <div onClick={() => setIsSearchSeleted(0)} className={theme ? "trackingItem": "trackingItemAlt"}>
              <img className="trackingIcon"
        src={icon1 == "" ? "https://images.freeimages.com/fic/images/icons/2779/simple_icons/2048/reddit_2048_black.png" :icon1}
        alt="new"/>
              <div>{searches[0]}</div>
            </div>}



            {searches[1] == "" && subreddits[1] == "" ? 

            <div onClick={() => setIsSearchSeleted(1)} id={theme? "normal": "darkGreen"} className="trackingItemEmpty">
              <div className="trackingIcon"></div>
              <div>{"Click to edit tracking"}</div>
            </div>
            
            
            : <div onClick={() => setIsSearchSeleted(1)} className={theme ? "trackingItem": "trackingItemAlt"}>
              <img className="trackingIcon"
        src={icon2 == "" ? "https://images.freeimages.com/fic/images/icons/2779/simple_icons/2048/reddit_2048_black.png" :icon2}
        alt="new"/>
              <div>{searches[1]}</div>
            </div>}



            {searches[2] == "" && subreddits[2] == "" ? 

            <div onClick={() => setIsSearchSeleted(2)} id={theme? "normal": "darkGreen"} className="trackingItemEmpty">
              <div className="trackingIcon"></div>
              <div>{"Click to edit tracking"}</div>
            </div>
            
            
            : <div onClick={() => setIsSearchSeleted(2)} className={theme ? "trackingItem": "trackingItemAlt"}>
              <img className="trackingIcon"
        src={icon3 == "" ? "https://images.freeimages.com/fic/images/icons/2779/simple_icons/2048/reddit_2048_black.png" :icon3}
        alt="new"/>
              <div>{searches[2]}</div>
            </div>}



            <div className="trackingText">Tracking {TrackingOn ? " On" : " Off"}</div>
            <div className="notificationsText">Notifications {NotificationsOn ? " On" : " Off"}</div>
          </div>
        </div> : 


        <div className="selectedContainer">

          <div onClick={() => setIsSearchSeleted(-1)} className="blackOverlay"></div>  
          <div id={theme? "" : "darkGreenContainer"} onClick={() => handleOnFocus()} className="editContainer">
            <div className="iconAndDelete"> 
              <SearchIcon onClick={() => handleOnFocus()} selected = {isSearchSelected}/>
              <button onClick={() =>
              resetSectionState()} className={true? "resetAlertButton" : "resetAlertButtonDark"}>Reset Alert</button>
            </div>
            <div onClick={() => handleOnFocus()} className="Subreddit">Subreddit:</div>
            <input defaultValue={subreddits[isSearchSelected]} id="subredditText" className={true? "subredditInput" : "subredditInputDark"}/>
            <div onClick={() => handleOnFocus()} className="Subreddit">Search Term:</div>
            <input onFocus={() => handleOnFocus()} defaultValue={searches[isSearchSelected]} id="searchTermText" className={true? "subredditInput" : "subredditInputDark"}/>
            <button onClick={() =>
              updateSectionstate()} className="SaveAlertButton">Save Alert</button>
          </div>
        </div>}



        <div className="buttonContainer">
          <button className="iconButton1" onClick={() => updateTracking()}>
            {TrackingOn ? <PauseIcon toggleOption = {theme} /> : <PlayIcon toggleOption = {theme} />}
          </button>
          
          <button className="iconButton1" onClick={() => updateNotifications()}>
            {NotificationsOn ? <PauseIcon toggleOption = {theme} /> : <PlayIcon toggleOption = {theme} />}
          </button>

          <button className="iconButton3" onClick={() => updateTheme()}>
            <ToggleIcon toggleOption = {theme}/>
          </button>
        </div>
      </div>
      <div className="rightSide">
        <div className="lastUpdatesText">Last Updates</div>
        <div id={theme ? "normal" : "darkGreen"} className="updateContainer">
          <div className="postingsContainer">
          <Headings/>
          </div>
          <div className="refreshesEvery2MinutesContainer">
            <div>Refreshes every:</div>
            <div>60 seconds</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
