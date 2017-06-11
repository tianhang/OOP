var data = {
  "calls": [
    {
      "id":1,
      "vessel": "USS Harpoon",
      "routeId": 1,
      "port": "HKHKG",
      "eta": null,
      "etd": "2016-01-03 00:00:00"
    },
    {
      "id":2,
      "vessel": "USS Harpoon",
      "routeId": 1,
      "port": "SGSIN",
      "eta": "2016-01-06 00:00:00",
      "etd": "2016-01-09 00:00:00"
    },
    {
      "id":3,
      "vessel": "USS Harpoon",
      "routeId": 1,
      "port": "USLAX",
      "eta": "2016-01-12 00:00:00",
      "etd": "2016-01-15 00:00:00"
    },
    {
      "id":4,
      "vessel": "USS Harpoon",
      "routeId": 1,
      "port": "USOAK",
      "eta": "2016-01-18 00:00:00",
      "etd": null
    },
    {
      "id":5,
      "vessel": "USS Starboard",
      "routeId": 2,
      "port": "HKHKG",
      "eta": null,
      "etd": "2016-01-04 00:00:00"
    },
    {
      "id":6,
      "vessel": "USS Starboard",
      "routeId": 2,
      "port": "USLAX",
      "eta": "2016-01-06 00:00:00",
      "etd": "2016-01-08 00:00:00"
    },
    {
      "id":7,
      "vessel": "USS Starboard",
      "routeId": 2,
      "port": "USOAK",
      "eta": "2016-01-10 00:00:00",
      "etd": "2016-01-12 00:00:00"
    },
    {
      "id":8,
      "vessel": "USS Starboard",
      "routeId": 2,
      "port": "SGSIN",
      "eta": "2016-01-14 00:00:00",
      "etd": "2016-01-16 00:00:00"
    },
    {
      "id":9,
      "vessel": "USS Starboard",
      "routeId": 2,
      "port": "HKHKG",
      "eta": "2016-01-18 00:00:00",
      "etd": "2016-01-20 00:00:00"
    },
    {
      "id":10,
      "vessel": "USS Starboard",
      "routeId": 2,
      "port": "USLAX",
      "eta": "2016-01-22 00:00:00",
      "etd": null
    },
    {
      "id":11,
      "vessel": "HMS Port",
      "routeId": 3,
      "port": "USOAK",
      "eta": null,
      "etd": "2016-01-15 00:00:00"
    },
    {
      "id":12,
      "vessel": "HMS Port",
      "routeId": 3,
      "port": "HKHKG",
      "eta": "2016-01-20 00:00:00",
      "etd": "2016-01-25 00:00:00"
    },
    {
      "id":13,
      "vessel": "HMS Port",
      "routeId": 3,
      "port": "SGSIN",
      "eta": "2016-01-30 00:00:00",
      "etd": null
    },
    {
      "id":14,
      "vessel": "USS Harpoon",
      "routeId": 4,
      "port": "USOAK",
      "eta": null,
      "etd": "2016-01-24 00:00:00"
    },
    {
      "id":15,
      "vessel": "USS Harpoon",
      "routeId": 4,
      "port": "USLAX",
      "eta": "2016-01-25 00:00:00",
      "etd": "2016-01-27 00:00:00"
    },
    {
      "id":16,
      "vessel": "USS Harpoon",
      "routeId": 4,
      "port": "HKHKG",
      "eta": "2016-01-28 00:00:00",
      "etd": "2016-01-30 00:00:00"
    },
    {
      "id":17,
      "vessel": "USS Harpoon",
      "routeId": 4,
      "port": "SGSIN",
      "eta": "2016-02-01 00:00:00",
      "etd": null
    }
  ]
};

console.log(data.calls);

//<routeid,[]>
var groupMap = {};

function groupDataByRouteId() {
  data.calls.forEach(function(elem){
    if(!groupMap[elem.routeId]){
      groupMap[elem.routeId] = [];
    }
    groupMap[elem.routeId].push(elem);

  });
};
groupDataByRouteId();
console.log(groupMap);

//var portCallsList = groupMap[2];
//var allVoyagesPairList = [];


//voyage model
function VoyagesPair(startPort,endPort,isTranshipment){
  this.startPort = startPort;
  this.endPort = endPort;
  this.isTranshipment = isTranshipment||false;
}

function getVoyagesByPortcalls(portCallsList){
  var voyagesPairList = [];
  var len = portCallsList.length;
  for(var i=0;i<len;i++){
    for(var j=i+1;j<len;j++){
      var voy = new VoyagesPair(portCallsList[i],portCallsList[j]);
      voyagesPairList.push(voy);
    }
  }
  return voyagesPairList;
}


function printVoyagesList(allVoyagesPairList){
  console.log(allVoyagesPairList.length);
  var idx = 0;
   allVoyagesPairList.forEach(function(voy){
    //console.log(new Date(voy.startPort.eta));
    console.log(voy.startPort.routeId,voy.startPort.port,voy.startPort.eta || '0000-00-00 00:00:00','-->',voy.endPort.port,voy.endPort.eta);
  });
}

//template method
function showPossibleVoyages(portCallsList){
  var voyagesPairList = getVoyagesByPortcalls(portCallsList);

  printVoyagesList(voyagesPairList);
}

//showPossibleVoyages(groupMap[1]);
//showPossibleVoyages(groupMap[2]);
//showPossibleVoyages(groupMap[3]);
//showPossibleVoyages(groupMap[4]);

function getAllVoys(){
  var allVoys = [];
  var routeids = Object.keys(groupMap);
  //console.log(routeids);
  routeids.forEach(function(rid){
    var pcalls = groupMap[rid];
    var voys = getVoyagesByPortcalls(pcalls);
    console.log(voys);
    allVoys = allVoys.concat(voys)
  });
  console.log(allVoys);
  allVoys.sort(function(v1,v2){
     return new Date(v1.startPort.eta) > new Date(v2.startPort.eta) ? 1 : -1;
    //return v1.startPort.port > v2.startPort.port ? 1 : -1;
    //return v1.startPort.vessel > v2.startPort.vessel ? 1 : -1;
  });
  return allVoys;
}

function groupVoyagesByDepPort(allVoys){
  var voyMap = {};
  allVoys.forEach(function(voy){
    if(!voyMap[voy.startPort.port]){
      voyMap[voy.startPort.port] = [];
    }
    voyMap[voy.startPort.port].push(voy);
  });
  return voyMap;
}

var allVoys = getAllVoys();
var voyPortMap = groupVoyagesByDepPort(allVoys);
console.log(voyPortMap);

function filterTranTargetByDate(depDate,tranTargetList){
  var result = [];
  if(!depDate) return result;
  tranTargetList.forEach(function(target){
    if(new Date(target.startPort.eta) > new Date(depDate)){
      result.push(target);
    }
  });
  return result;
}

function appendTranshipments(allVoys){
  var transList = [];
  allVoys.forEach(function(voy){
    var port = voy.startPort.port;
    var depDate = voy.startPort.eta;
    var tranTargetList = voyPortMap[port];
    var filteredTranTargetList = filterTranTargetByDate(depDate,tranTargetList);
    filteredTranTargetList.forEach(function(target){
      if(voy.startPort.routeId != target.startPort.routeId){
        transList.push(new VoyagesPair(voy.startPort,target.startPort,true));
      } 
    });
    //transList.push(new VoyagesPair(voy,))
  });
  return allVoys.concat(transList);
}

var res = appendTranshipments(allVoys);
console.log(res);

function showAllVoys(){
  var allVoys = [];
  var routeids = Object.keys(groupMap);
  console.log(routeids);
  routeids.forEach(function(rid){
    var pcalls = groupMap[rid];
    var voys = getVoyagesByPortcalls(pcalls);
    console.log(voys);
    allVoys = allVoys.concat(voys)
  });
  console.log(allVoys);
  allVoys.sort(function(v1,v2){
     return new Date(v1.startPort.eta) > new Date(v2.startPort.eta) ? 1 : -1;
    //return v1.startPort.port > v2.startPort.port ? 1 : -1;
    //return v1.startPort.vessel > v2.startPort.vessel ? 1 : -1;
  });
  //console.log(allVoys);
  printVoyagesList(allVoys);
}
//showAllVoys();
//printVoyagesList(allVoyagesPairList);



