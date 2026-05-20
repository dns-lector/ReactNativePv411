const GameColors = {
    bgColor: (num:number):string => {
        return num == 0 ? "#CBC2B3"
        : num == 2 ? "#EEE6DB"
        : num == 4 ? "#ECE0C8"
        : num == 8 ? "#EFB27C"
        : num == 16 ? "#F39768"
        : num == 32 ? "#F37D63"
        : num == 64 ? "#F46042"
        : num == 128 ? "#EACF76"
        : num == 256 ? "#EDCB67"
        : num == 512 ? "#ECC85A"
        : num == 1024 ? "#E7C257"
        : num == 2048 ? "#E8BE4E"
        : "#3C3A33";
    },
    fgColor: (num:number):string => {
        return num == 0 ? "#CBC2B3"
        : num == 2 ? "#797367"
        : num == 4 ? "#757168"
        : num == 8 ? "#EFFAFE"
        : num == 16 ? "#FAF6F5"
        : num == 32 ? "#FCF3F6"
        : num == 64 ? "#F7F9F4"
        : num == 128 ? "#EFF2F9"
        : num == 256 ? "#F7F9F8"
        : num == 512 ? "#FDF7F7"
        : num == 1024 ? "#F7F2F6"
        : num == 2048 ? "#F7F8F0"
        : "#F9F6F2";
    },
};

export default GameColors;