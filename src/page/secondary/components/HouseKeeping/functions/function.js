import { child, get, ref, remove } from "firebase/database";
import { auth, database, db } from "../../../../../config/adminFirebase";

export const listOfDirtyRoom = async function () {
  const realRef = ref(database);
  const arr = [];
  const filterRoom = [];
  await get(child(realRef, `liveDirty/`)).then(async (snapshot) => {
    if (snapshot.exists()) {
      const keys = Object.keys(snapshot.val());
      const iterator = keys.values();
      for (var key of iterator) {
        await get(child(realRef, `liveDirty/` + key)).then((snapshot) => {
          if (snapshot.exists()) {
            arr.push(snapshot.val());
            filterRoom.push(snapshot.val().roomNumber);
          }
        });
      }
    }
  });

  return arr;
};

export const moveFromDirty = async function (roomNumber) {
  const ref1 = ref(database, "liveDirty/dirty" + roomNumber);
  await remove(ref1);
};
