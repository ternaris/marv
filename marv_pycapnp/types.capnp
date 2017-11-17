@0x8ce54f16698f41e9;

using Timedelta = UInt64;
using Timestamp = UInt64;


# Below here unused so far

struct Datetime {
  timestamp @0 :Timestamp;
  # ns since epoch

  tzoffset @1 :Int16;
  # timezone offset in minutes
}

struct Map(Key, Value) {
  items @0 :List(Item);

  struct Item {
    key @0 :Key;
    value @1 :Value;
  }
}
