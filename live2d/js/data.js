const firebaseConfig = {
  apiKey: "AIzaSyBc0LJ7zfGruc3bMEnGcFFhT0C0-VPN3Qs",
  authDomain: "web-final-59cc1.firebaseapp.com",
  projectId: "web-final-59cc1",
  storageBucket: "web-final-59cc1.appspot.com",
  messagingSenderId: "698536696728",
  appId: "1:698536696728:web:4c772aaffab829621e69ed",
  measurementId: "G-V1V8KEM399"
};

  // Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const $moreCan=$("#moreCan");
const $All=$("#All");
const $total=$("#total");
const $client=$("#client");
const $sbtn=$("#sbtn");
const $sinput=$("#sinput");

const $TableBody=$("#TableBody");
const $chooselotto=$("#chooselotto");

const lotto = db.collection("lotto2");

async function getlotto(){
  const todoDocs = await lotto.get();
  todoDocs.forEach(id=>{
    const temp=id.data();
    console.log(temp);
    const tablerow=`
        <tr>
          <th>${temp.開獎日}</th>
          <th>${temp.期別}</th>
          <th>${temp.n1},${temp.n2},${temp.n3},${temp.n4},${temp.n5},${temp.n6}</th>
          <th>${temp.S}</th>
        </tr>
    `;
    $TableBody.append(tablerow);
    const sle=`
      <option value="${temp.期別}">${temp.開獎日}_${temp.期別}期</option>
    `;
    $chooselotto.append(sle);
  });
}
getlotto();

$All_number=$("#All_number");
$money=$("#money");

$sbtn.on('click',async(event)=>{
  event.preventDefault();
  const don = await lotto.get();

  const type=$chooselotto.val();
  var number=$sinput.val().split(",");

  number.sort();
  console.log(type);
  console.log(number);

  var list2=[];
  var price="可惜沒中獎";
  
  don.forEach(i=>{
    const temp=i.data();
    if(type==temp.期別){
      const list1=[temp.n1,temp.n2,temp.n3,temp.n4,temp.n5,temp.n6];
      var special=temp.S;
      list1.sort();
      console.log(list1);

      var count=0;
      for(var i=0;i<list1.length;i++){
        for(var j=0;j<number.length;j++){
          if(list1[i]==number[j]){
            count++;
            list2.push(number[j]);
          }
        }
      }

      var sp=0;
      for(var i=0;i<number.length;i++){
        if(number[i]==special){
          sp=1;
          list2.push(number[i]);
        }
      }
      console.log(sp);
      console.log(count);
      //calculation
      if(count==6){
        price="頭獎";
      }
      else if(count==5 && sp==1){
        price="二獎";
      }
      else if(count==5){
        price="三獎";
      }
      else if(count==4 && sp==1){
        price="四獎";
      }
      else if(count==4){
        price="五獎 2000元";
      }
      else if(count==3 && sp==1){
        price="六獎 1000元";
      }
      else if(count==2 && sp==1){
        price="七獎 400元";
      }
      else if(count==3){
        price="普獎 400元";
      }
      else{
        price="可惜沒中獎";
      }
    }

    list2.sort();
    var tt='';
    for(var i=0;i<list2.length;i++){
      tt+=list2[i]+' '
    }
    $All_number.text("中的數字："+tt);
    $money.text("中獎："+price);
  })
  $chooselotto.val("");
  $sinput.val("");
})