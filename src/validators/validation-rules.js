import { extend } from "vee-validate";
import { required} from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "Это поле обязательно",
});
