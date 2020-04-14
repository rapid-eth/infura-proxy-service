import { ethers } from 'ethers';
import models from '@models';
import { normalizeEvent } from "./utils"


export const createEventListener = async (provider, contract, eventFullName) => {
    let eventTopicHash = ethers.utils.id(eventFullName)
    let eventFilter = {
        address: contract.address,
        topics: [eventTopicHash]
    }
    provider.on(eventFilter, saveLogEvent(contract, eventFullName))
}

const saveLogEvent = (contract, eventFullName) => (...args) => {

    console.log("** New Event Found")
    let eventLog = args[args.length-1]

    processAndStoreNewEvent(contract, eventLog, eventFullName)
}

const processAndStoreNewEvent = async (contract, eventLog, eventFullName) => {
  
    let eventABI = contract.interface.events[eventFullName];
    let eventInterface = new ethers.utils.Interface([eventABI]);
    let parsedEvent = await eventInterface.parseLog(eventLog)
  
    let rawEvent = [];
    for (let k = 0; k < eventABI.inputs.length; k++) {
      const arg = parsedEvent.args[k];
      rawEvent.push(arg);
    }
    let jsonEvent = normalizeEvent(parsedEvent.args, eventABI.inputs);

    let storeObject = {
      transaction_hash: eventLog.transactionHash,
      contract_address: contract.address,
      event_topic_hash: parsedEvent.topic,
      event_abi: eventABI,
      raw_event: rawEvent,
      json_event: jsonEvent,
    };
  
    console.log('storing new event ' + parsedEvent.name);
    await models.Event.create(storeObject);
    
  };