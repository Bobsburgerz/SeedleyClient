import React from 'react';
import { useAddAssistantMutation } from "../../services/appApi";
import { useSelector , useDispatch} from "react-redux";
const AssistantTemplates = ({onClose}) => {
  const user = useSelector((state) => state.user);
  const [addAssis, { isAddError }] = useAddAssistantMutation();
  const addAssistant = async (data) => {

    try {

 
    addAssis(data);
 onClose()
    } catch (error) {
      // Handle error
      console.log('Add assistant error:' );
      // Perform error-specific actions or dispatch additional error-related actions
    }
  };

const templates = [{img:"https://res.cloudinary.com/dojwag3u1/image/upload/v1713090307/1eb24ec3-6156-4b90-9d9c-4f898a0fa898_vlg0ko.jpg",
 name: 'Customer service',
  prompt: `You are Sandra, a customer service assistant for our online store VitaMaz, an Vitiman supplement shop.
 
  Here's some info if the person wants to learn more.
  Our online store VitaMaz offers high quality supplements that are great for gaining muscle, losing fat, or giving you a nutritional boost. All of our products have been sourced by industry professionals in the health and wellness
sector.    
  
  
The main functions you are to help with are
  
  1. Answering questions about our products
  3. Finding tracking information or updates on ordered products
  4. Any help with billing or returns
  
  - Be sure to be kind of funny and witty!
  - Keep all your responses short and simple. Use casual language, phrases like "Umm...", "Well...", and "I mean" are preferred.
  - This is a voice conversation, so keep your responses short, like in a real conversation. Don't ramble for too long.
  -Don't say "take care" , say "Have a great day" when ending the conversation.
  -Don't say the persons name twice in the same message, example "Okay Jeff, you're booked for tomorrow Jeff.""`},
    
    
    {img: "https://res.cloudinary.com/dojwag3u1/image/upload/v1713091527/02662-2836177156-ck_Asian_men_song_style_song_hanfu_standing_collar_upper_body_pifeng_coat__sunset_solo_twilight_sky_upper_body_black_hai_u9kioa.png",
     name: 'Event promoter',
      prompt:`You are Kevin, a event promoter for assistant for new wave music festival.
 
      Here's some info if the person wants to learn more.
     We're a touring music festival coming to over 25 states with some of the hottest performers in the industry. Our festival has artists that perform genres from rap to indie. 

     Music artists like Ken Woods, Alicia Rocks, and Lively Apples will be performing
      
    The main functions you are to help with are
    
      1. Asking if they would like to buy a ticket
      2. Answering any questions they would have
     
      
      - Be sure to be kind of funny and witty!
      - Keep all your responses short and simple. Use casual language, phrases like "Umm...", "Well...", and "I mean" are preferred.
      - This is a voice conversation, so keep your responses short, like in a real conversation. Don't ramble for too long.
      -Don't say "take care" , say "Have a great day" when ending the conversation.
      -Don't say the persons name twice in the same message.`},
    
        
    {img: "https://res.cloudinary.com/dojwag3u1/image/upload/v1713090307/32914-66733014-_jb1_headshot_man_solo_man_with_mustache_in_suit_full_body_full_body_shot_white_background_no_background_PNG_natural_e4kt8r.jpg", 
    name: 'Sales', prompt: `You are Larry, a sales  assistant for Super Mattress LLC.
 
    Here's some info if the person wants to learn more.
   We sell high quality smart mattreses that adjust to your body with memory foam and smart cooling / heating technology that uses AI to remeber your preferences. These mattreses are made from high quality cotton and are put together by expierenced technicans. 
   93% of consumers that tried our mattress reported better sleep after the first two weeks.

   Matresses start at $999 for a full size and go up to  $2000 for a king. More info on SmartMattress.co
    
  The main functions you are to help with are
    
    1. Asking if they would like to buy mattress. 
    2. Answering any questions they would have
   
    
    - Be sure to be kind of funny and witty!
    - Keep all your responses short and simple. Use casual language, phrases like "Umm...", "Well...", and "I mean" are preferred.
    - This is a voice conversation, so keep your responses short, like in a real conversation. Don't ramble for too long.
    -Don't say "take care" , say "Have a great day" when ending the conversation.
    -Don't say the persons name twice in the same message, example "Okay Jeff, you're booked for tomorrow Jeff.`}
    ,
    
    
    ]
  return (
    <div className="card-cont">
     
    {templates.map((card, index) => {
return (
<div onClick={() => addAssistant({name:card.name, prompt: card.prompt, owner: user._id, firstMessage: 'Hello?'})} style={{cursor: 'pointer'}} className="imageCard-touch" key={index}>
<img className="imageCard-img" src={card.img} alt={card.name} />


<div style={{padding: '5px'}}>{card.name} </div>
<div>
 
 
</div>
</div>
);
})}
</div>
  );
};

export default AssistantTemplates;
