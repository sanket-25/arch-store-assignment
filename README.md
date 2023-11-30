# arch-store-assignment
Arch Store Assignment

<h1>cmd -> <br/></h1>

// to run assignment 1 <br/>
node assignment-one/index.js <br/>

// to run assignment 2 <br/>
node assignment-two/index.js <br/>

// to run sub-assignments of 1 and 2
<p>
node assignment-___/1one.js <br/>
node assignment-___/2two.js <br/>
node assignment-___/3three.js <br/>
node assignment-___/4four.js <br/>
</p>

<h1>For Assignment 2</h1>
<pre>
  // Method POST in the body 
{
    "str": "one two three four five"
}
output ->
status: 406 not acceptable
{
  "error": "Not enough words (less than 8)"
}


{
    "str": "one two three four five six seven eight nine ten"
}
output -> 
status: 200 OK
{
  "message": "At least 8 words found"
}
</pre>
