import {o_http_request_handler_file_explorer} from "https://deno.land/x/o_webserver@8.6/a_o_http_request_handler.module.js"

import { f_o_api_response } from "./../../models/mod.module.js";

let f_http_request_handler = async function(
  o_http_connection, 
  o_request_event,
  o_webserver
){
    // you can extend the behaviour here for example
    if(o_request_event.request.url.includes("/f_o_api_response")){
        // var o_request_body = await o_request_event.body.json();
        
        if(o_request_event.request.body){
          var o_request_data =  await (o_request_event.request.json())
          // console.log(o_request_data)
          var o_api_response = await f_o_api_response(o_request_data);
          
        }
        // if(o_request_event)
        return o_request_event.respondWith(
            new Response(
                JSON.stringify(o_api_response),
                // 'tmp',
                {
                  status: 200, 
                  headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                  } 
                }
            )
        );
    }
    


    return o_http_request_handler_file_explorer.f_http_request_handler(
      o_http_connection, 
      o_request_event,
      o_webserver
    );
};
 
export {f_http_request_handler}
