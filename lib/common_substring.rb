module CommonSubstring
  def substr_match?(substr, body)
    substr, body = substr.downcase, body.downcase
    m = i = 0
    body_length = body.length
    substr_length = substr.length
    t = kmp_table(substr)
    while m + i < body_length
      if substr[i] == body[m + i]
        i += 1
        return true if i == substr_length
      else
        m += i - t[i]
        i = [0, t[i]].max
      end
    end

    false
  end

  def kmp_table(w)
    pos = 2
    cnd = 0
    t = [-1, 0]
    wlen = w.length
    while pos < wlen
      if w[pos-1] == w[cnd]
        cnd += 1
        t[pos] = cnd
        pos += 1
      elsif cnd > 0
        cnd = t[cnd]
      else
        t[pos] = 0
        pos += 1
      end
    end

    t
  end
end
