package expo.modules.selectabletext

import android.content.Context
import android.view.ActionMode
import android.widget.TextView
import expo.modules.kotlin.AppContext
import expo.modules.kotlin.viewevent.EventDispatcher
import expo.modules.kotlin.views.ExpoView

class ReactNativeSelectableTextView(context: Context, appContext: AppContext) : TextView(context) {
  private val onTextSelectionChange by EventDispatcher()
  
  init {
    // Set up the textView properties
    text = "Hello from Android TextView!"
    textSize = 18f
    setTextIsSelectable(true)
    
    // Disable scrolling to behave like Text component
    isVerticalScrollBarEnabled = false
    isHorizontalScrollBarEnabled = false
    overScrollMode = OVER_SCROLL_NEVER
    
    // Set layout parameters to wrap content
    layoutParams = android.view.ViewGroup.LayoutParams(
      android.view.ViewGroup.LayoutParams.WRAP_CONTENT,
      android.view.ViewGroup.LayoutParams.WRAP_CONTENT
    )
    
    // Disable context menu while keeping selection
    customSelectionActionModeCallback = object : ActionMode.Callback {
      override fun onCreateActionMode(mode: ActionMode?, menu: android.view.Menu?): Boolean {
        // Clear the menu to hide all options but keep the action mode active
        menu?.clear()
        return true
      }
      
      override fun onPrepareActionMode(mode: ActionMode?, menu: android.view.Menu?): Boolean {
        // Clear the menu again in case it gets repopulated
        menu?.clear()
        return false
      }
      
      override fun onActionItemClicked(mode: ActionMode?, item: android.view.MenuItem?): Boolean {
        return false
      }
      
      override fun onDestroyActionMode(mode: ActionMode?) {
        // Selection cleared
        onTextSelectionChange(mapOf(
          "selectedText" to "",
          "start" to 0,
          "end" to 0
        ))
      }
    }
  }
  
  override fun onSelectionChanged(selStart: Int, selEnd: Int) {
    super.onSelectionChanged(selStart, selEnd)
    
    // Post to ensure this runs after the text is properly set
    post {
      val text = text?.toString() ?: ""
      if (selStart >= 0 && selEnd >= 0 && selStart != selEnd && selEnd <= text.length) {
        val selectedText = text.substring(selStart, selEnd)
        onTextSelectionChange(mapOf(
          "selectedText" to selectedText,
          "start" to selStart,
          "end" to selEnd
        ))
      } else if (selStart == selEnd) {
        // Selection cleared
        onTextSelectionChange(mapOf(
          "selectedText" to "",
          "start" to 0,
          "end" to 0
        ))
      }
    }
  }
  
  override fun onMeasure(widthMeasureSpec: Int, heightMeasureSpec: Int) {
    super.onMeasure(widthMeasureSpec, heightMeasureSpec)
    
    // Ensure the view sizes itself to fit content like a Text component
    val widthMode = MeasureSpec.getMode(widthMeasureSpec)
    val heightMode = MeasureSpec.getMode(heightMeasureSpec)
    
    if (heightMode != MeasureSpec.EXACTLY) {
      // Allow the TextView to size itself to content height
      val desiredHeight = layout?.height ?: measuredHeight
      setMeasuredDimension(measuredWidth, desiredHeight)
    }
  }
}
