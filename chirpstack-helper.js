/*****************************************************************
 * Functions to help using the payload decoder of Chirpstack
 * by Andreas Schliemann 
 * Library compatible with the robertkrimen/otto
 *****************************************************************/

function dec2bin8(dec){
    /* function dec2bin8()
    converts a decimal number to 8-bit-binary
    adds leading zeros
    does not check whether dec is too big.
   
    ARGUMENTS
    unsigned integer number: <255!

    RETURNS
    8-bit binary string
    */
    var r='00000000';
    r=r.split("");
    var b=(dec >>> 0).toString(2);
    for (var i=0;i<b.length;i++){
    	r[(8-b.length)+i]=b[i];
    }
    return r.join("");
}


function IEEE754_8BytesToFloat32(byteArray,inputTypeLittleEndian){
    /* function IEEE754_8BytesToFloat32()
    converts 8-byte to float 32
    ARGUMENTS
    byteArray of exactly 4 array elements
    1/0 for little Endian representation or not. If not: array is converted into little endian.

    RETURNS
    signed float
    */
    if (inputTypeLittleEndian!=1){
        byteArray=byteArray.reverse();
    }
    var arr_bits=''; //contains the bitwise information as string. e.g. '01000100100100100'
    for (i=0;i<byteArray.length;i++){
        arr_bits=arr_bits+dec2bin8(byteArray[i]);
    }
    var signum=arr_bits[0];
    var exponent=parseInt(arr_bits.substr(1,8),2)-127;
    var value=Math.pow(-1,signum);
    var tmp_binary=arr_bits.substr(8+1,arr_bits.length);
    var tmp=1;
    for (var i=0;i<tmp_binary.length;i++){
        tmp=tmp+tmp_binary[i]*Math.pow(2,-(i+1));
    }
    return value*Math.pow(2,exponent)*tmp;
}