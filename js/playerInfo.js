//スタート画面のラジオボタン・テキストボックスで入力された情報を扱う

/**
 * 人間が選択されたら入力された名前を、AIが選択されたら「AI」の文字列を返す関数
 * @param {string} numPlayerType 取得したいラジオボタン群のname(one-player等)
 * @param {string} numPlayerName 取得したいテキストボックスのid(one-player-name等)
 * @returns {string|null} 人間なら入力された名前、AIなら「AI」、どちらも選択されていなければnull
 */
export function getPlayerTypeAndName(numPlayerType, numPlayerName){
    const playerType = getSelectedPlayerType(numPlayerType);
    if(playerType === "human"){
        return getPlayerName(numPlayerName);
    } else if(playerType === "AI"){
        return "AI";
    } else {
        return null; // どちらも選択されていない場合
    }
}

//ラジオボタンで、人間かAIかどちらが選択されたか返す関数
function getSelectedPlayerType(numPlayerType){
    const radios = document.getElementsByName(numPlayerType);
    for(const radio of radios){
        if(radio.checked) return radio.value;
    }
    return null;
}


//テキストボックスに入力された名前を取ってくる
function getPlayerName(numPlayerName) {
  const input = document.getElementById(numPlayerName);
  return input.value.trim();
}
