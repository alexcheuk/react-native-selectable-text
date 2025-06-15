package expo.modules.selectabletext

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class ReactNativeSelectableTextModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("ReactNativeSelectableText")

    View(ReactNativeSelectableTextView::class) {
      Prop("text") { view: ReactNativeSelectableTextView, text: String? ->
        view.text = text ?: ""
        // Request layout to recalculate size
        view.requestLayout()
      }
      
      Prop("fontSize") { view: ReactNativeSelectableTextView, fontSize: Double? ->
        fontSize?.let { 
          view.textSize = it.toFloat()
          view.requestLayout()
        }
      }
      
      Prop("color") { view: ReactNativeSelectableTextView, color: Int? ->
        color?.let { view.setTextColor(it) }
      }
      
      Prop("fontWeight") { view: ReactNativeSelectableTextView, fontWeight: String? ->
        fontWeight?.let { weight ->
          val typeface = when (weight) {
            "bold", "700", "800", "900" -> android.graphics.Typeface.BOLD
            else -> android.graphics.Typeface.NORMAL
          }
          view.setTypeface(view.typeface, typeface)
        }
      }
      
      Prop("fontStyle") { view: ReactNativeSelectableTextView, fontStyle: String? ->
        fontStyle?.let { style ->
          val typeface = when (style) {
            "italic" -> android.graphics.Typeface.ITALIC
            else -> android.graphics.Typeface.NORMAL
          }
          view.setTypeface(view.typeface, typeface)
        }
      }
      
      Prop("textAlign") { view: ReactNativeSelectableTextView, textAlign: String? ->
        textAlign?.let { align ->
          val gravity = when (align) {
            "left" -> android.view.Gravity.START
            "right" -> android.view.Gravity.END
            "center" -> android.view.Gravity.CENTER
            "justify" -> android.view.Gravity.START // Android doesn't support justify natively
            else -> android.view.Gravity.START
          }
          view.gravity = gravity
        }
      }
      
      Prop("lineHeight") { view: ReactNativeSelectableTextView, lineHeight: Double? ->
        lineHeight?.let { view.setLineSpacing(it.toFloat() - view.textSize, 1.0f) }
      }
      
      Events("onTextSelectionChange")
    }
  }
}
