import java.util.Collections
import java.util.Arrays
import kotlin.collections.indexOf
import kotlin.system.measureTimeMillis
import kotlin.math.pow

fun quickSort(list: LongArray, low: Long, high: Long) {
    if (low >= high || low < 0) {
        return
    } else {
        var p: Long = partition(list, low, high)
        quickSort(list, low, p - 1)
        quickSort(list, p + 1, high)
    }
}

fun swap(arr: LongArray, n1: Long, n2: Long) {
    val t = arr[n1.toInt()]
    arr[n1.toInt()] = arr[n2.toInt()]
    arr[n2.toInt()] = t
}

fun partition(list: LongArray, low: Long, high: Long): Long {
    var pivot: Long = list[high.toInt()]
    var pivotIndex: Long = low - 1
    for (i in low..(high - 1)) {
        if (list[i.toInt()] <= pivot) {
            pivotIndex++
            swap(list, pivotIndex, i)
        }
    }
    pivotIndex++
    swap(list, pivotIndex, high)
    return pivotIndex
}

fun main() {
    var times: Int = 1
    for (i in 1..times) {
        var length: Long = (10.toDouble()).pow(i.toDouble()).toLong()
        var testArr = LongArray(length.toInt()) { length - it }
        println(Arrays.toString(testArr))
        val time = measureTimeMillis { quickSort(testArr, 0, (testArr.size - 1).toLong()) }
        println(Arrays.toString(testArr))
        println(time)
    }
}