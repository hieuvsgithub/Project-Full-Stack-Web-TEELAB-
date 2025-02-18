import slugify from "slugify";

const slugMiddleware = (sourceField, targetField) => {
  return function (schema) {
    schema.pre("save", async function (next) {
      // kiem tra xem da co slug chua , neu chua thi tao moi
      if (!this[targetField] && this[sourceField]) {
        let slug = slugify(`${this[sourceField]}-${this._id}`, {
          lower: true, // chuyen tat ca thanh chu thuong
          strict: true, // loai bo ki tu dac biet
          locale: "vi", // ho tro tieng viet
        });

        // Đảm bảo slug là duy nhất, nếu trùng thì thêm số vào cuối
        // let existingDoc = await this.constructor.findOne({ [targetField]: slug });
        // let counter = 1;

        // while (existingDoc) {
        // 	slug = slugify(`${this[sourceField]}-${this._id}-${counter}`, {
        // 		lower: true,
        // 		strict: true,
        // 		locale: "vi",
        // 	});
        // 	existingDoc = await this.constructor.findOne({ [targetField]: slug });
        // 	counter++;
        // }

        this[targetField] = slug;
      }
      next();
    });
  };
};

export default slugMiddleware;
